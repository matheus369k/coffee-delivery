import { FormUseType } from '..';
import { api } from '../../../lib/api';

interface RegisterAddressPropsType {
    address: FormUseType;
}

export async function RegisterAddress({ address }: RegisterAddressPropsType) {
    let addressId: string | undefined;

    await api
        .post('/user/register', { ...address })
        .then((response: { data: { addressId: string | undefined } }) => {
            addressId = response.data.addressId;

            if (!addressId) {
                throw new Error('Address not found');
            }

            window.localStorage.setItem('addressId', addressId);
        })
        .catch((error: Error) => {
            return console.log(error.message);
        });

    return addressId;
}
