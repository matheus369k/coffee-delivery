/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    GetAddressViaCep,
    GetAddressViaCepPropsType,
} from '@pages/Checkout/components/form/service/get-viacep';
import { AddressType } from '@pages/Confirm';

const address = {
    cep: '55460000',
    number: 45,
};

const ResponseAddress = {
    localidade: 'Recife',
    complemento: 'Casa',
    bairro: 'Dom pedro primeiro',
    logradouro: 'Luiz inacio',
    uf: 'PE',
};

const mockRequestUrl = jest.fn();
const ReturnResponseAddress = jest.fn();
const mockSetInUseFormNewAddress = jest.fn();
const mockSetAddress = jest
    .fn()
    .mockImplementation((handleState: (state: typeof address) => AddressType) => {
        const state = address;

        return handleState(state);
    });

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    get: (url: string) => {
        mockRequestUrl.mockReturnValue(url);

        return {
            then: (
                handleResponse: (response: { data: typeof ResponseAddress | undefined }) => void,
            ) => {
                const response = { data: ReturnResponseAddress() };

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
}));

const getAddressViaCepProps: GetAddressViaCepPropsType = {
    cep: '55460000',
    setAddress: mockSetAddress,
    setInUseFormNewAddress: mockSetInUseFormNewAddress,
};

describe('Get viaCep address', () => {
    test('Request correct url', () => {
        ReturnResponseAddress.mockReturnValue({ ...ResponseAddress });

        GetAddressViaCep({ ...getAddressViaCepProps });

        const requestUrl = `https://viacep.com.br/ws/${getAddressViaCepProps.cep}/json/`;
        expect(mockRequestUrl()).toEqual(requestUrl);
    });

    test('Get state correct datas', () => {
        ReturnResponseAddress.mockReturnValue({ ...ResponseAddress });

        GetAddressViaCep({ ...getAddressViaCepProps });

        expect(mockSetAddress.mock.results[0].value).toEqual({
            ...address,
            city: ResponseAddress.localidade,
            complement: ResponseAddress.complemento,
            neighborhood: ResponseAddress.bairro,
            street: ResponseAddress.logradouro,
            uf: ResponseAddress.uf,
        });
    });

    test('Call function set address in useForm', () => {
        ReturnResponseAddress.mockReturnValue({ ...ResponseAddress });

        GetAddressViaCep({ ...getAddressViaCepProps });

        expect(mockSetInUseFormNewAddress).toHaveBeenCalledTimes(1);
    });

    test('Invite correct data to set address in useForm', () => {
        ReturnResponseAddress.mockReturnValue({ ...ResponseAddress });

        GetAddressViaCep({ ...getAddressViaCepProps });

        expect(mockSetInUseFormNewAddress.mock.lastCall).toEqual([
            {
                ...address,
                city: ResponseAddress.localidade,
                complement: ResponseAddress.complemento,
                neighborhood: ResponseAddress.bairro,
                street: ResponseAddress.logradouro,
                uf: ResponseAddress.uf,
            },
        ]);
    });
});
