import axios from 'axios';
import { AddressType } from '..';
import React from 'react';

export interface GetAddressViaCepPropsType {
  cep: string;
  setInUseFormNewAddress: (addressResponse: AddressType) => void;
  setAddress: React.Dispatch<React.SetStateAction<AddressType>>;
}

export function GetAddressViaCep({
  cep,
  setInUseFormNewAddress,
  setAddress,
}: GetAddressViaCepPropsType) {
  axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => {
      setAddress((state) => {
        const addressResponse: AddressType = {
          ...state,
          city: response.data.localidade || state.city,
          complement: response.data.complemento || state.complement,
          neighborhood: response.data.bairro || state.neighborhood,
          street: response.data.logradouro || state.street,
          uf: response.data.uf || state.uf,
        };

        setInUseFormNewAddress(addressResponse);

        return addressResponse;
      });
    })
    .catch((error: Error) => console.log(error.message));
}
