import { BuyCoffeeDatasType } from '..';
import { api } from '../../../lib/api';

export interface PostShoppingPropsType {
    buyCoffeeDatas: BuyCoffeeDatasType[];
    addressId: string;
    payFormat: string;
}

export interface RequestBodyType {
    coffees_list: {
        name: string;
        image: string;
        total_price: string;
        count: number;
    }[];
    form_of_payment: string;
}

export async function PostShopping({
    addressId,
    buyCoffeeDatas,
    payFormat,
}: PostShoppingPropsType) {
    const requestBody: RequestBodyType = {
        coffees_list: [
            ...buyCoffeeDatas.map((buyCoffeeData) => {
                return {
                    name: buyCoffeeData.name,
                    image: buyCoffeeData.image,
                    total_price: buyCoffeeData.total_price,
                    count: buyCoffeeData.count,
                };
            }),
        ],
        form_of_payment: payFormat,
    };

    await api
        .post(`/shopping/${addressId}`, requestBody)
        .then((response: { data: { shoppingId: string } }) => {
            const shoppingId = response.data.shoppingId;

            window.localStorage.setItem('shoppingId', shoppingId);
        })
        .catch((error: Error) => {
            return console.log(error.message);
        });
}
