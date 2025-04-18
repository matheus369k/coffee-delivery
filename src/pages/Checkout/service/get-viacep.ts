import axios from "axios";

export interface AddressType {
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

/* Associação de chave e valor
city === localidade
complement === complemento
neighborhood === bairro
street === logradouro
uf === uf
*/
export async function GetAddressViaCep(cep: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data: AddressType = await response.data;

    if (Object.keys(data).length === 0) {
      throw new Error("Address not found");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
