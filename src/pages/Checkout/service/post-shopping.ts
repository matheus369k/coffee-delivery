import { BuyCoffeeDatasType } from '..';
import { api } from '../../../lib/api';

interface PostShoppingPropsType {
    buyCoffeeDatas: BuyCoffeeDatasType[];
    addressId: string;
    payFormat: string;
}

export async function PostShopping({
    addressId,
    buyCoffeeDatas,
    payFormat,
}: PostShoppingPropsType) {
    await api
        .post(`/shopping/${addressId}`, {
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
        })
        .then((response: { data: { shoppingId: string } }) => {
            const shoppingId: string = response.data.shoppingId;

            window.localStorage.setItem('shoppingId', shoppingId);
        })
        .catch((error: Error) => {
            return console.log(error.message);
        });
}
