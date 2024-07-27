/* eslint-disable react-hooks/exhaustive-deps */
import { StylesListCoffee, StylesForm, StyledEmptyCart } from './styles';
import { FormUser } from './form-user';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContext, useEffect, useState } from 'react';
import { CountProductsContext } from '../../contexts/context-count-products';
import axios from 'axios';
import { CardBuyCoffee } from './card-buy-coffee';
import { Package } from '@phosphor-icons/react';

interface BuyCoffeeDatasType {
    id: number;
    name: string;
    image: string;
    totalPrice: string;
    count: number;
}

interface CoffeeDatasType {
    id: number;
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
    cep: z.coerce.number().min(8),
    street: z.string().min(4),
    number: z.coerce.number().min(1),
    complement: z.string().min(4),
    neighborhood: z.string().min(4),
    city: z.string().min(4),
    uf: z.string().min(2),
});

type FormUseType = z.infer<typeof FormUserZodSchema>;

export function Checkout() {
    const { countProducts } = useContext(CountProductsContext);
    const hookForm = useForm<FormUseType>({
        resolver: zodResolver(FormUserZodSchema),
    });

    const { handleSubmit } = hookForm;

    const [buyCoffeeDatas, setBuyCoffeeDatas] = useState<BuyCoffeeDatasType[]>([]);
    const [priceTotal, setPriceTotal] = useState<TotalPriceType>({
        priceEnd: '0.00',
        Products: '0.00',
        taxa: '3.50',
    });

    useEffect(() => {
        if (!countProducts) {
            return;
        }

        axios.get('/coffee-delivery/src/data/db.json').then((response) => {
            const coffeeDatas: CoffeeDatasType[] = response.data;

            const createCoffeeBuyObject: BuyCoffeeDatasType[] = [];

            for (const count of countProducts) {
                for (const coffee of coffeeDatas) {
                    if (coffee.id === count.id) {
                        const total = (count.count * parseFloat(coffee.price.replace(',', '.'))).toFixed(2);

                        createCoffeeBuyObject.push({
                            id: coffee.id,
                            name: coffee.name,
                            image: coffee.image,
                            totalPrice: total,
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
            calcTotalPrice += parseFloat(buyCoffeeData.totalPrice);
        });

        setPriceTotal((state) => {
            return {
                ...state,
                priceEnd: (calcTotalPrice + parseFloat(state.taxa)).toFixed(2),
                Products: calcTotalPrice.toFixed(2),
            };
        });
    }

    function handleFormUser(data: FormUseType) {
        console.log(data);
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
                    <FormUser />
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
