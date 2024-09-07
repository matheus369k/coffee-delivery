/* eslint-disable react-hooks/exhaustive-deps */
import { StylesListCoffee, StylesForm } from './styles';
import { FormUser } from './components/form/index';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContext, useState } from 'react';
import { CountProductsContext } from '../../contexts/context-count-products';
import { CardBuyCoffee } from './components/card-buy-coffee';
import { useNavigate } from 'react-router';
import { PricesTotal } from './components/total-prices';
import { Loading } from './components/loading';
import { GetCoffees } from './service/get-coffees';
import { PostShopping } from './service/post-shopping';
import { RegisterAddress } from './service/register-address';
import { UpdateAddress } from './service/update-address';

export interface BuyCoffeeDatasType {
    id: string;
    name: string;
    image: string;
    total_price: string;
    count: number;
}

export interface CoffeeDatasType {
    id: string;
    name: string;
    tags: string[];
    slugs: string[];
    image: string;
    description: string;
    price: string;
}

export interface TotalPriceType {
    Products: string;
    taxa: string;
    priceEnd: string;
}

const FormUserZodSchema = z.object({
    cep: z.string().min(8),
    street: z.string().min(4),
    number: z.coerce.number().min(1),
    complement: z.string().default(''),
    neighborhood: z.string().min(4),
    city: z.string().min(4),
    uf: z.string().min(2),
});

export type FormUseType = z.infer<typeof FormUserZodSchema>;

export function Checkout() {
    const { countProducts, removeCountsProductsContext } = useContext(CountProductsContext);
    const navigate = useNavigate();
    const hookForm = useForm<FormUseType>({
        resolver: zodResolver(FormUserZodSchema),
    });

    const [payFormat, setPayFormat] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [priceTotal, setPriceTotal] = useState<TotalPriceType>({
        priceEnd: '0.00',
        Products: '0.00',
        taxa: '3.50',
    });

    const { buyCoffeeDatas } = GetCoffees({ buyPriceTotal, countProducts });

    const { handleSubmit } = hookForm;

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
        if (!removeCountsProductsContext) return;
        if (!payFormat) return;

        setIsLoading(true);

        let addressId = window.localStorage.getItem('addressId');

        if (!addressId) {
            const newAddressId = await RegisterAddress({ address });

            if (!newAddressId) {
                return;
            }

            addressId = newAddressId;
        }

        if (window.sessionStorage.editeAddress) {
            await UpdateAddress({ address, addressId });
        }

        await PostShopping({ addressId, buyCoffeeDatas, payFormat }).then(() => {
            setIsLoading(false);
            removeCountsProductsContext();

            navigate('/coffee-delivery/confirm');
        });
    }

    if (!countProducts || countProducts.length === 0) {
        return <Loading />;
    }

    return (
        <main>
            <StylesForm
                onSubmit={handleSubmit(handleFormUser)}
                aria-autocomplete="none"
                autoComplete="off"
                autoSave="off"
            >
                <FormProvider {...hookForm}>
                    <FormUser setNewPayFormat={setNewPayFormat} />
                </FormProvider>

                <StylesListCoffee>
                    <h3>Cafés selecionados</h3>
                    <ul>
                        {buyCoffeeDatas ? (
                            buyCoffeeDatas.map((data) => {
                                return <CardBuyCoffee {...data} key={data.id} />;
                            })
                        ) : (
                            <p>Carregando...</p>
                        )}
                    </ul>
                    <PricesTotal isLoading={isLoading} priceTotal={priceTotal} />
                </StylesListCoffee>
            </StylesForm>
        </main>
    );
}
