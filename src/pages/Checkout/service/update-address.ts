import { FormUseType } from '..';
import { api } from '@lib/api';

export interface UpdateAddressPropsType {
  addressId: string;
  address: FormUseType;
}

export async function UpdateAddress({ address, addressId }: UpdateAddressPropsType) {
  await api
    .put(`/user/${addressId}`, { ...address })
    .then(() => {
      window.sessionStorage.removeItem('editeAddress');
    })
    .catch((error: Error) => {
      console.log(error.message);
    });
}
