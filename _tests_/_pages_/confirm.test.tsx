import { render, screen } from '@testing-library/react';
import { Confirm } from '../../src/pages/Confirm';
import React from 'react';

interface AddressType {
    id: string;
    cep: number;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    city: string;
    uf: string;
}

interface DatasUserType {
    addresses: AddressType;
    form_of_payment: string;
}

const mockRequestUrl = jest.fn();
const ReturnResponseShoppingDatas = jest.fn();
const mockSetState = jest.fn();

const spyUseState = jest.spyOn(React, 'useState');

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    create: (configs: { baseURL: string }) => {
        return {
            get: (pathName: string) => {
                mockRequestUrl(configs.baseURL.concat(pathName));

                return {
                    then: (
                        handleResponse: (response: {
                            data: { shopping: DatasUserType[] | never[] | undefined };
                        }) => void,
                    ) => {
                        const response = { data: { shopping: ReturnResponseShoppingDatas() } };

                        handleResponse(response);
                    },
                };
            },
        };
    },
}));

const response: DatasUserType = {
    form_of_payment: 'Cartão de debito',
    addresses: {
        cep: 55360000,
        city: 'Recife',
        complement: 'apartamento numero 34',
        id: '1',
        neighborhood: 'Dom pedro segundo',
        number: 45,
        street: 'dom josé dantas',
        uf: 'PE',
    },
};

describe('Confirm page', () => {
    afterAll(() => {
        window.localStorage.removeItem('shoppingId');
    });

    beforeEach(() => {
        ReturnResponseShoppingDatas.mockReturnValueOnce(response);

        window.localStorage.setItem('shoppingId', response.addresses.id);
    });

    test('State get correct datas', () => {
        spyUseState.mockImplementationOnce(() => [null, mockSetState]);

        render(<Confirm />);

        expect(mockSetState.mock.lastCall).toEqual([response]);
    });

    test('Request url is correct', () => {
        spyUseState.mockImplementationOnce(() => [null, mockSetState]);

        render(<Confirm />);

        expect(mockRequestUrl.mock.lastCall).toEqual([
            'https://coffee-delivery-api-1.onrender.com/shopping/1',
        ]);
    });

    test('should component content', () => {
        spyUseState.mockImplementationOnce(() => [response, mockSetState]);

        render(<Confirm />);

        const { street, number } = response.addresses;

        expect(screen.getByText(`Rua ${street}, ${number}`)).toBeInTheDocument();
        expect(screen.getByText(response.form_of_payment)).toBeInTheDocument();
    });
});
