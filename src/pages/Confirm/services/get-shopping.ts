import { api } from "@lib/api";

export interface AddressType {
  id: string;
  cep: number;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
}

export interface DatasUserType {
  addresses: AddressType;
  form_of_payment: string;
}

export async function getShopping(shoppingId: string) {
  try {
    const resolve = await api.get(`/shopping/${shoppingId}`);
    const data = await resolve.data["shopping"];

    if (!data) {
      throw new Error("not found data");
    }

    return data as DatasUserType;
  } catch (error) {
    console.log(error);
  }
}
