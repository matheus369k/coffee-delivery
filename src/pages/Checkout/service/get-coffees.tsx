/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { api } from '@lib/api';
import { BuyCoffeeDatasType, CoffeeDatasType } from '..';

export interface CountProductsType {
  id: string;
  count: number;
}
export interface GetCoffeesPropsType {
  countProducts: CountProductsType[] | undefined;
  buyPriceTotal: (buyCoffeeProp: BuyCoffeeDatasType[]) => void;
}

export function GetCoffees({ countProducts, buyPriceTotal }: GetCoffeesPropsType) {
  const [buyCoffeeDatas, setBuyCoffeeDatas] = useState<BuyCoffeeDatasType[]>([]);

  useEffect(() => {
    if (!countProducts) {
      return;
    }
    api
      .get('/coffees')
      .then((response: { data: { [x: string]: CoffeeDatasType[] } }) => {
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
      })
      .catch((error: Error) => {
        return console.log(error.message);
      });
  }, [countProducts]);

  return {
    buyCoffeeDatas,
  };
}
