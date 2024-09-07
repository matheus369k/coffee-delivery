/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormUseType } from '../../../../src/pages/Checkout';
import { RegisterAddress } from '../../../../src/pages/Checkout/service/register-address';

const ReturnResponseAddressId = jest.fn();
const RequestBodyAddress = jest.fn();
const mockRequestUrl = jest.fn();

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    create: (configs: { baseURL: string }) => {
        return {
            post: (pathName: string, handleBody: FormUseType) => {
                mockRequestUrl.mockReturnValue(configs.baseURL.concat(pathName));
                RequestBodyAddress.mockReturnValue(handleBody);

                return {
                    then: (
                        handleResponse: (response: {
                            data: { addressId: string | undefined };
                        }) => void,
                    ) => {
                        const response = { data: { addressId: ReturnResponseAddressId() } };

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

const address: FormUseType = {
    cep: '55460000',
    city: 'Recife',
    complement: '',
    neighborhood: 'Dom pedro primeiro',
    number: 45,
    street: 'Luiz inacio',
    uf: 'PE',
};

describe('Register address', () => {
    test('Request correct url', async () => {
        ReturnResponseAddressId.mockReturnValue('1');

        await RegisterAddress({ address });

        expect(mockRequestUrl()).toEqual(
            'https://coffee-delivery-api-1.onrender.com/user/register',
        );
    });

    test('Invite request body on the correct format', async () => {
        ReturnResponseAddressId.mockReturnValue('1');

        await RegisterAddress({ address });

        expect(RequestBodyAddress()).toEqual(address);
    });

    test('Set AddressId on the localStorage', async () => {
        ReturnResponseAddressId.mockReturnValue('952');

        await RegisterAddress({ address });

        expect(window.localStorage.addressId).toEqual('952');
    });

    test('Return correct data', async () => {
        ReturnResponseAddressId.mockReturnValue('952');

        const addressId = await RegisterAddress({ address });

        expect(addressId).toEqual('952');
    });
});
