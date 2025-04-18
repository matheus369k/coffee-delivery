import { CartCoffeeType } from "@contexts/cart-coffee-context";
import { api } from "@lib/api";

export interface PostShoppingPropsType {
  buyCoffeeDatas: CartCoffeeType[];
  addressId: string;
  paymentType: string;
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
  paymentType,
}: PostShoppingPropsType) {
  try {
    if (!paymentType) {
      throw new Error("props buyCoffeeDatas not found");
    }
    if (buyCoffeeDatas.length === 0) {
      throw new Error("props paymentType not found");
    }

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
      form_of_payment: paymentType,
    };

    const response = await api.post(`/shopping/${addressId}`, requestBody);
    const data = await response.data.shoppingId;

    if (!data) {
      throw new Error("Shopping not found");
    }

    window.localStorage.setItem("shoppingId", data);
  } catch (error) {
    console.log(error);
  }
}
