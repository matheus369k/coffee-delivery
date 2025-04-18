import { api } from "@lib/api";

export interface AddressType {
  cep: string;
  street: string;
  complement?: string;
  neighborhood: string;
  city: string;
  number: number;
  uf: string;
}

export async function GetUserAddress(addressId: string) {
  try {
    const response = await api.get(`/user/${addressId}`);
    const data: AddressType = await response.data.address;

    if (!data) {
      throw new Error("Address not found");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
