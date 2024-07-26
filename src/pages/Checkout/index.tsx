/* eslint-disable react-hooks/exhaustive-deps */
import { Minus, Plus, Trash } from '@phosphor-icons/react';
import { StylesListCoffee, StylesForm } from './styles';
import { FormUser } from './form-user';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContext, useEffect, useState } from 'react';
import { CountProductsContext } from '../../contexts/context-count-products';
import axios from 'axios';

interface BuyCoffeeDatasType {
    id: number;
    name: string;
    image: string;
    totalPrice: string;
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
    const hookForm = useForm<FormUseType>({
        resolver: zodResolver(FormUserZodSchema),
    });

    const [buyCoffeeDatas, setBuyCoffeeDatas] = useState<BuyCoffeeDatasType[]>([]);
    const [priceTotal, setPriceTotal] = useState<TotalPriceType>({
        priceEnd: '0.00',
        Products: '0.00',
        taxa: '3.50',
    });
    const [amountCoffee, setAmountCoffee] = useState<number>(1);

    const { countProducts } = useContext(CountProductsContext);
    const { handleSubmit } = hookForm;

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
                        });
                    }
                }
            }

            setBuyCoffeeDatas(createCoffeeBuyObject);

            buyPriceTotal();
        });
    }, [countProducts]);

    function buyPriceTotal() {
        let calcTotalPrice: number = 0;

        buyCoffeeDatas.forEach((buyCoffeeData) => {
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

    function handleAmountCoffeeCount() {
        setAmountCoffee((state) => {
            return state + 1;
        });
    }

    function handleLessCoffeeCount() {
        setAmountCoffee((state) => {
            return state - 1;
        });
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
                            return (
                                <li key={data.id}>
                                    <img src={data.image} alt="" />
                                    <div>
                                        <h4>{data.name}</h4>
                                        <form>
                                            <div>
                                                <button disabled={amountCoffee === 1} onClick={handleLessCoffeeCount} type="button">
                                                    <Minus size={16} weight="bold" />
                                                </button>
                                                <input onChange={(event) => setAmountCoffee(Number(event.target.value))} type="number" value={amountCoffee} name="count" />
                                                <button disabled={amountCoffee === 99} onClick={handleAmountCoffeeCount} type="button">
                                                    <Plus size={16} weight="bold" />
                                                </button>
                                            </div>
                                            <button type="button">
                                                <Trash size={16} />
                                                <span>Remover</span>
                                            </button>
                                        </form>
                                    </div>
                                    <span>{data.totalPrice}</span>
                                </li>
                            );
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
