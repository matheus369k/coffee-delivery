/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormUseType } from '@pages/Checkout';
import {
    GetUserAddress,
    GetUserAddressPropsType,
} from '@pages/Checkout/components/form/service/get-user-address';

const mockRequestUrl = jest.fn();
const ReturnResponseAddress = jest.fn();
const mockSetInUseFormNewAddress = jest.fn();
const mockSetAddress = jest
    .fn()
    .mockImplementation((handleState: (state: FormUseType) => FormUseType) =>
        handleState({} as FormUseType),
    );
const mockHandleDisabledEditeAddress = jest.fn();

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    create: (configs: { baseURL: string }) => {
        return {
            get: (pathName: string) => {
                mockRequestUrl.mockReturnValue(configs.baseURL.concat(pathName));

                return {
                    then: (
                        handleResponse: (response: {
                            data: { address: FormUseType | undefined };
                        }) => void,
                    ) => {
                        const response = { data: { address: ReturnResponseAddress() } };

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

const getUserAddressProps: GetUserAddressPropsType = {
    addressId: '900',
    setInUseFormNewAddress: mockSetInUseFormNewAddress,
    setAddress: mockSetAddress,
    handleDisabledEditeAddress: mockHandleDisabledEditeAddress,
};

const address: FormUseType = {
    cep: '55460000',
    city: 'Recife',
    complement: '',
    neighborhood: 'Dom pedro primeiro',
    number: 45,
    street: 'Luiz inacio',
    uf: 'PE',
};

describe('Get user Address', () => {
    test('Correct request url', () => {
        GetUserAddress({ ...getUserAddressProps });

        const RequestUrl = `https://coffee-delivery-api-1.onrender.com/user/${getUserAddressProps.addressId}`;
        expect(mockRequestUrl()).toEqual(RequestUrl);
    });

    test('Get state correct datas', () => {
        ReturnResponseAddress.mockReturnValue(address);

        GetUserAddress({ ...getUserAddressProps });

        expect(mockSetAddress.mock.results[0].value).toEqual(address);
    });

    test('Call function set address in useForm', () => {
        ReturnResponseAddress.mockReturnValue(address);

        GetUserAddress({ ...getUserAddressProps });

        expect(mockSetInUseFormNewAddress).toHaveBeenCalledTimes(1);
    });

    test('Invite correct data to set address in useForm', () => {
        ReturnResponseAddress.mockReturnValue(address);

        GetUserAddress({ ...getUserAddressProps });

        expect(mockSetInUseFormNewAddress.mock.lastCall).toEqual([address]);
    });

    test('Call disabled edite address', () => {
        ReturnResponseAddress.mockReturnValue(address);

        GetUserAddress({ ...getUserAddressProps });

        expect(mockHandleDisabledEditeAddress).toHaveBeenCalledTimes(1);
    });
});
