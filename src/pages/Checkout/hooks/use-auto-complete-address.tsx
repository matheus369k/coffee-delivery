import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { GetUserAddress } from "../service/get-user-address";
import { GetAddressViaCep } from "../service/get-viacep";

export interface AddressType {
  cep: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  number: number;
  uf: string;
}

export function useAutoCompleteAddress() {
  const {
    setValue,
    watch,
    formState: { isDirty },
  } = useFormContext();
  const cep: string = watch("cep") || "";
  const [hasEditeAddress, setHasEditeAddress] = useState(true);
  const [address, setAddress] = useState({
    city: "",
    complement: "",
    neighborhood: "",
    street: "",
    uf: "",
  } as AddressType);

  function isValideCep() {
    const regex = /^(\d{5}-\d{3}|\d{8}|\d{5}(-\d{4})?)$/;
    return regex.test(cep);
  }

  function setInUseFormNewAddress(addressResponse: AddressType) {
    const addressKeys: string[] = Object.keys(addressResponse);
    const addressValues: string[] = Object.values(addressResponse);

    addressKeys.forEach((_, index) => {
      setValue(addressKeys[index], addressValues[index]);
    });
  }

  async function autoCompleteAddressViaCep() {
    try {
      const data = await GetAddressViaCep(cep);

      if (!data) {
        throw new Error("Not found address from viacep");
      }

      const resultAddress = {
        ...address,
        city: data.localidade || address.city,
        complement: data.complemento || address.complement,
        neighborhood: data.bairro || address.neighborhood,
        street: data.logradouro || address.street,
        uf: data.uf || address.uf,
      } as AddressType;
      setAddress(resultAddress);
      setInUseFormNewAddress(resultAddress);
    } catch (error) {
      console.log(error);
    }
  }

  async function autoCompleteAddress(addressId: string) {
    try {
      if (isDirty) {
        throw new Error("You don't call autoCompleteAddress more one time");
      }

      const data = await GetUserAddress(addressId);

      if (!data) {
        throw new Error("Not found address from database");
      }

      setAddress({ ...address, ...data });
      setInUseFormNewAddress({ ...address, ...data });
      handleDisabledEditeAddress();
    } catch (error) {
      console.log(error);
    }
  }

  function handleDisabledEditeAddress() {
    setHasEditeAddress(false);
  }

  function handleHasEditeAddress() {
    setHasEditeAddress(true);
    window.sessionStorage.setItem("editeAddress", "true");
  }

  return {
    address,
    hasEditeAddress,
    handleHasEditeAddress,
    autoCompleteAddressViaCep,
    autoCompleteAddress,
    isValideCep: isValideCep(),
  };
}
