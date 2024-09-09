/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BuyCoffeeDatasType, CoffeeDatasType } from '@pages/Checkout';
import { GetCoffees } from '@pages/Checkout/service/get-coffees';

const mockBuyPriceTotal = jest.fn();
const mockSetState = jest.fn();
const mockRequestUrl = jest.fn();
const ReturnResponseCoffeeDatas = jest.fn();

const spyState = jest.spyOn(React, 'useState');

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: (effect: () => void, deps?: unknown[]) => {
        effect();
        deps;
    },
}));

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    create: (configs: { baseURL: string }) => {
        return {
            get: (pathName: string) => {
                mockRequestUrl(configs.baseURL.concat(pathName));

                return {
                    then: (
                        handleResponse: (response: {
                            data: { coffees: CoffeeDatasType[] | undefined };
                        }) => void,
                    ) => {
                        const response = { data: { coffees: ReturnResponseCoffeeDatas() } };

                        try {
                            handleResponse(response);

                            return {
                                catch: (_error: (error: { message: string }) => void) => {},
                            };
                        } catch (error) {
                            return {
                                catch: (functionError: (error: { message: string }) => void) => {
                                    functionError({ message: 'error' });
                                },
                            };
                        }
                    },
                };
            },
        };
    },
}));

const dataCoffees: CoffeeDatasType[] = [
    {
        id: '1',
        name: 'Expresso Americano',
        tags: ['Tradicional'],
        slugs: ['tradicional'],
        image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/expresso-americano.png?raw=true',
        description: 'Expresso diluído, menos intenso que o tradicional',
        price: '9,90',
    },
    {
        id: '2',
        name: 'Expresso Cremoso',
        tags: ['Tradicional'],
        slugs: ['tradicional'],
        image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/expresso-cremoso.png?raw=true',
        description: 'Café expresso tradicional com espuma cremosa',
        price: '9,90',
    },
];

const dataShopping: BuyCoffeeDatasType[] = [
    {
        id: '1',
        name: 'Expresso Americano',
        image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/expresso-americano.png?raw=true',
        total_price: '39.60',
        count: 4,
    },
    {
        id: '2',
        name: 'Expresso Cremoso',
        image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/expresso-cremoso.png?raw=true',
        total_price: '19.80',
        count: 2,
    },
];

const countProducts = [
    {
        id: '1',
        count: 4,
    },
    {
        id: '2',
        count: 2,
    },
];

describe('Get coffees data', () => {
    test('Call State and get correct datas', () => {
        ReturnResponseCoffeeDatas.mockReturnValueOnce(dataCoffees);
        spyState.mockImplementationOnce(() => [[], mockSetState]);

        GetCoffees({ countProducts, buyPriceTotal: mockBuyPriceTotal });

        expect(mockSetState).toHaveBeenCalledTimes(1);
        expect(mockSetState.mock.lastCall).toEqual([dataShopping]);
    });

    test('Call buyPriceTotal and invite correct datas', () => {
        ReturnResponseCoffeeDatas.mockReturnValueOnce(dataCoffees);
        spyState.mockImplementationOnce(() => [[], mockSetState]);

        GetCoffees({ countProducts, buyPriceTotal: mockBuyPriceTotal });

        expect(mockBuyPriceTotal).toHaveBeenCalledTimes(1);
        expect(mockBuyPriceTotal.mock.lastCall).toEqual([dataShopping]);
    });

    test('get coffees return correct data', () => {
        ReturnResponseCoffeeDatas.mockReturnValueOnce(dataCoffees);
        spyState.mockImplementationOnce(() => [dataShopping, mockSetState]);

        const { buyCoffeeDatas } = GetCoffees({ countProducts, buyPriceTotal: mockBuyPriceTotal });

        expect(buyCoffeeDatas).toEqual(dataShopping);
    });
});
