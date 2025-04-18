import { FormUseType } from "..";
import { api } from "@lib/api";

export interface RegisterAddressPropsType {
  address: FormUseType;
}

export async function RegisterAddress({ address }: RegisterAddressPropsType) {
  try {
    const response = await api.post("/user/register", {
      cep: address.cep,
      street: address.street,
      number: address.number,
      complement: address.complement,
      uf: address.uf,
      city: address.city,
      neighborhood: address.neighborhood,
    });
    const data: string | undefined = await response.data.addressId;

    if (!data) {
      throw new Error("Address not found");
    }

    window.localStorage.setItem("addressId", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
