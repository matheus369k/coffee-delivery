/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    PostShopping,
    PostShoppingPropsType,
    RequestBodyType,
} from '@pages/Checkout/service/post-shopping';
import { env } from '@/env';

const ReturnResponseShoppingId = jest.fn();
const RequestBodyShopping = jest.fn();
const mockRequestUrl = jest.fn();

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    create: (configs: { baseURL: string }) => {
        return {
            post: (pathName: string, handleBody: RequestBodyType) => {
                mockRequestUrl.mockReturnValue(configs.baseURL.concat(pathName));
                RequestBodyShopping.mockReturnValue(handleBody);

                return {
                    then: (
                        handleResponse: (response: { data: { shoppingId: string } }) => void,
                    ) => {
                        const response = { data: { shoppingId: ReturnResponseShoppingId() } };

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

const postShoppingProps: PostShoppingPropsType = {
    addressId: '1',
    buyCoffeeDatas: [
        {
            count: 1,
            id: '1',
            image: 'https://localhost:3000/image.png',
            name: 'Expresso',
            total_price: '9,90',
        },
    ],
    payFormat: 'Cartão de debito',
};

const requestBody: RequestBodyType = {
    coffees_list: [
        {
            name: 'Expresso',
            image: 'https://localhost:3000/image.png',
            total_price: '9,90',
            count: 1,
        },
    ],
    form_of_payment: 'Cartão de debito',
};

describe('Post shopping datas', () => {
    test('Request on the correct url', async () => {
        await PostShopping({ ...postShoppingProps });

        expect(mockRequestUrl()).toEqual(`${env.VITE_API_URL}/shopping/1`);
    });

    test('Invite request body on the correct format', async () => {
        await PostShopping({ ...postShoppingProps });

        expect(RequestBodyShopping()).toEqual(requestBody);
    });

    test('Set shoppingId on the localStorage', async () => {
        ReturnResponseShoppingId.mockReturnValue(952);

        await PostShopping({ ...postShoppingProps });

        expect(window.localStorage.shoppingId).toEqual('952');
    });
});
