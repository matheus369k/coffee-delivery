/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
    coffeeDatasType,
    GetCoffees,
    GetCoffeesPropsType,
} from '../../../src/pages/Home/service/get-coffees';

const mockRequestUrl = jest.fn();
const mockSetStateStatus = jest.fn();
const mockSetStateCoffeesDatas = jest.fn();
const ReturnResponseCoffeeDatas = jest.fn();

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
                            data: { coffees: coffeeDatasType[] | never[] | undefined };
                        }) => void,
                    ) => {
                        const response = { data: { coffees: ReturnResponseCoffeeDatas() } };

                        try {
                            handleResponse(response);

                            return {
                                catch: (_error: () => void) => {},
                            };
                        } catch (error) {
                            return {
                                catch: (error: () => void) => {
                                    error();
                                },
                            };
                        }
                    },
                };
            },
        };
    },
}));

const { query }: GetCoffeesPropsType = {
    query: '',
};

describe('Get coffees', () => {
    beforeEach(() => {
        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => [[], mockSetStateCoffeesDatas])
            .mockImplementationOnce(() => ['loading', mockSetStateStatus]);
    });

    test('Url to request is Correct', () => {
        ReturnResponseCoffeeDatas.mockReturnValue([]);

        GetCoffees({ query });

        expect(mockRequestUrl.mock.lastCall).toEqual([
            'https://coffee-delivery-api-1.onrender.com/coffees/',
        ]);
    });

    test('Data not found', () => {
        ReturnResponseCoffeeDatas.mockReturnValue([]);

        GetCoffees({ query });

        expect(mockSetStateStatus.mock.lastCall).toEqual(['not-found']);
        expect(mockSetStateCoffeesDatas.mock.lastCall).toEqual([[]]);
    });

    test('Error to request', () => {
        ReturnResponseCoffeeDatas.mockReturnValue(undefined);

        GetCoffees({ query });

        expect(mockSetStateStatus.mock.lastCall).toEqual(['error']);
        expect(mockSetStateCoffeesDatas.mock.lastCall).toEqual(undefined);
    });

    test('get datas', () => {
        const database: coffeeDatasType[] = [
            {
                id: '1',
                name: 'Árabe',
                tags: ['Especial'],
                slugs: ['especial'],
                image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/%C3%A1rabe.png?raw=true',
                description: 'Bebida preparada com grãos de café árabe e especiarias',
                price: '9,90',
            },
            {
                id: '2',
                name: 'Irlandês',
                tags: ['Especial', 'Alcoólico'],
                slugs: ['especial', 'alcoolico'],
                image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/irland%C3%AAs.png?raw=true',
                description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
                price: '9,90',
            },
        ];

        ReturnResponseCoffeeDatas.mockReturnValue(database);

        GetCoffees({ query });

        expect(mockSetStateStatus.mock.lastCall).toEqual(['complete']);
        expect(mockSetStateCoffeesDatas.mock.lastCall).toEqual([database]);
    });
});
