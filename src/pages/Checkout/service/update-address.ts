import { FormUseType } from '..';
import { api } from '../../../lib/api';

interface UpdateAddressPropsType {
    addressId: string;
    address: FormUseType;
}

export async function UpdateAddress({ address, addressId }: UpdateAddressPropsType) {
    await api.put(`/user/${addressId}`, { ...address });

    window.sessionStorage.removeItem('editeAddress');
}
