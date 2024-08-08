/* eslint-disable react-hooks/exhaustive-deps */
import { StylesListCoffee, StylesForm, StyledEmptyCart } from './styles';
import { FormUser } from './form-user';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContext, useEffect, useState } from 'react';
import { CountProductsContext } from '../../contexts/context-count-products';
import { CardBuyCoffee } from './card-buy-coffee';
import { Package } from '@phosphor-icons/react';
import { DatasUserContext } from '@/contexts/context-user-datas';
import { useNavigate } from 'react-router';
import { api } from '@/lib/api';

interface BuyCoffeeDatasType {
    id: string;
    name: string;
    image: string;
    total_price: string;
    count: number;
}

interface CoffeeDatasType {
    id: string;
    name: string;
    tags: string[];
    image: string;
    description: string;
    price: string;
}

interface TotalPriceType {
    Products: string;
    taxa: string;
    priceEnd: string;
}

const FormUserZodSchema = z.object({
    cep: z.coerce.string().min(8),
    street: z.string().min(4),
    number: z.coerce.number().min(1),
    complement: z.string().min(4),
    neighborhood: z.string().min(4),
    city: z.string().min(4),
    uf: z.string().min(2),
});

type FormUseType = z.infer<typeof FormUserZodSchema>;

export function Checkout() {
    const { countProducts, removeCountsProductsContext } = useContext(CountProductsContext);
    const { setNewDataUserContext } = useContext(DatasUserContext);
    const navigate = useNavigate();
    const hookForm = useForm<FormUseType>({
        resolver: zodResolver(FormUserZodSchema),
    });

    const { handleSubmit } = hookForm;

    const [buyCoffeeDatas, setBuyCoffeeDatas] = useState<BuyCoffeeDatasType[]>([]);
    const [payFormat, setPayFormat] = useState<string>('');
    const [priceTotal, setPriceTotal] = useState<TotalPriceType>({
        priceEnd: '0.00',
        Products: '0.00',
        taxa: '3.50',
    });

    useEffect(() => {
        if (!countProducts) {
            return;
        }

        api.get('/coffees').then((response) => {
            const coffeeDatas: CoffeeDatasType[] = response.data['coffees'];

            const createCoffeeBuyObject: BuyCoffeeDatasType[] = [];

            for (const count of countProducts) {
                for (const coffee of coffeeDatas) {
                    if (coffee.id === count.id) {
                        const total = (count.count * parseFloat(coffee.price.replace(',', '.'))).toFixed(2);

                        createCoffeeBuyObject.push({
                            id: coffee.id,
                            name: coffee.name,
                            image: coffee.image,
                            total_price: total,
                            count: count.count,
                        });
                    }
                }
            }

            setBuyCoffeeDatas(createCoffeeBuyObject);

            buyPriceTotal(createCoffeeBuyObject);
        });
    }, [countProducts]);

    function buyPriceTotal(buyCoffeeProp: BuyCoffeeDatasType[]) {
        let calcTotalPrice: number = 0;

        buyCoffeeProp.forEach((buyCoffeeData) => {
            calcTotalPrice += parseFloat(buyCoffeeData.total_price);
        });

        setPriceTotal((state) => {
            return {
                ...state,
                priceEnd: (calcTotalPrice + parseFloat(state.taxa)).toFixed(2),
                Products: calcTotalPrice.toFixed(2),
            };
        });
    }

    function setNewPayFormat(payForm: string) {
        setPayFormat(payForm);
    }

    async function handleFormUser(address: FormUseType) {
        if (!setNewDataUserContext || !removeCountsProductsContext) {
            return;
        }

        if (!payFormat) {
            return;
        }

        let userId = window.localStorage.getItem('registerId');

        if (!userId) {
            await api.post('/user/register', { ...address }).then((response) => {
                userId = response.data.addressUserId;

                if (typeof userId !== 'string') {
                    return;
                }

                window.localStorage.setItem('registerId', userId);
            });
        }

        await api
            .post(`/shopping/${userId}`, {
                coffees_list: [...buyCoffeeDatas],
                form_of_payment: payFormat,
            })
            .then((response) => {
                const shoppingCoffeeListId: string = response.data.shoppingCoffeeListId;

                window.localStorage.setItem('shoppingCoffeeListId', shoppingCoffeeListId);
            });

        removeCountsProductsContext();

        navigate('/coffee-delivery/confirm');
    }

    if (!countProducts || countProducts.length === 0) {
        return (
            <StyledEmptyCart>
                <Package size={220} weight="light" />
                <p>Adicione produtos ao carrinho!</p>
            </StyledEmptyCart>
        );
    }

    return (
        <main>
            <StylesForm onSubmit={handleSubmit(handleFormUser)}>
                <FormProvider {...hookForm}>
                    <FormUser setNewPayFormat={setNewPayFormat} />
                </FormProvider>

                <StylesListCoffee>
                    <h3>Cafés selecionados</h3>
                    <ul>
                        {buyCoffeeDatas?.map((data) => {
                            return <CardBuyCoffee {...data} key={data.id} />;
                        })}
                    </ul>
                    <div>
                        <p>
                            <span>Total de itens</span>
                            <span>R$ {priceTotal.Products}</span>
                        </p>
                        <p>
                            <span>Entrega</span>
                            <span>R$ {priceTotal.taxa}</span>
                        </p>
                        <p>
                            <span>Total</span>
                            <span>R$ {priceTotal.priceEnd}</span>
                        </p>
                        <button type="submit">confirmar pedido</button>
                    </div>
                </StylesListCoffee>
            </StylesForm>
        </main>
    );
}
