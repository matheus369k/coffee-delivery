import { FormUseType } from '..';
import { api } from '@lib/api';

export interface UpdateAddressPropsType {
  addressId: string;
  address: FormUseType;
}

export async function UpdateAddress({ address, addressId }: UpdateAddressPropsType) {
  try {
    await api.put(`/user/${addressId}`, {
      street: address.street,
      number: address.number,
      complement: address.complement,
      uf: address.uf,
      city: address.city,
      cep: address.cep,
      neighborhood: address.neighborhood,
    });
    window.sessionStorage.removeItem('editeAddress');
  } catch (error) {
    console.log(error);
  }
}
