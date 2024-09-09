/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormUseType } from '@pages/Checkout';
import { UpdateAddress, UpdateAddressPropsType } from '@pages/Checkout/service/update-address';

const ReturnResponseAddressId = jest.fn();
const RequestBodyAddress = jest.fn();
const mockRequestUrl = jest.fn();

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    create: (configs: { baseURL: string }) => {
        return {
            put: (pathName: string, handleBody: FormUseType) => {
                mockRequestUrl.mockReturnValue(configs.baseURL.concat(pathName));
                RequestBodyAddress.mockReturnValue(handleBody);

                return {
                    then: (handleResponse: () => void) => {
                        try {
                            handleResponse();

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

const updateAddressProps: UpdateAddressPropsType = {
    address,
    addressId: '954',
};

describe('Update address', () => {
    test('Request correct url', async () => {
        ReturnResponseAddressId.mockReturnValue('1');

        await UpdateAddress({ ...updateAddressProps });

        const url = `https://coffee-delivery-api-1.onrender.com/user/${updateAddressProps.addressId}`;
        expect(mockRequestUrl()).toEqual(url);
    });

    test('Invite request body on the correct format', async () => {
        ReturnResponseAddressId.mockReturnValue('1');

        await UpdateAddress({ ...updateAddressProps });

        expect(RequestBodyAddress()).toEqual(address);
    });

    test('Remove var editeAddress from localStorage', async () => {
        window.sessionStorage.setItem('editeAddress', 'true');

        await UpdateAddress({ ...updateAddressProps });

        expect(window.sessionStorage.editeAddress).toBeDefined;
    });
});
