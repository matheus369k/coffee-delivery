import AxiosMockAdapter from "axios-mock-adapter";
import { GetAddressViaCep, type AddressType } from "./get-viacep";
import axios from "axios";

const mockAxios = new AxiosMockAdapter(axios);
jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));

/* Associação de chave e valor
city === localidade
complement === complemento
neighborhood === bairro
street === logradouro
uf === uf
*/

describe("GetAddressViaCep", () => {
  const defaultAddressResponse: AddressType = {
    bairro: "Bairro A",
    complemento: "Complemento A",
    localidade: "Cidade A",
    logradouro: "Rua A",
    uf: "UF A",
  };

  const spyConsole = jest.spyOn(console, "log");
  beforeAll(() => {
    spyConsole.mockImplementation(() => {});
  });
  afterAll(() => {
    spyConsole.mockRestore();
  });
  afterEach(() => {
    mockAxios.reset();
  });

  test("should render correctly", async () => {
    mockAxios
      .onGet("https://viacep.com.br/ws/12345678/json/")
      .replyOnce(200, defaultAddressResponse);
    const address = await GetAddressViaCep("12345678");
    expect(address).toMatchObject(defaultAddressResponse);
  });

  test("shouldn't break application when request to erros", async () => {
    mockAxios
      .onGet("https://viacep.com.br/ws/12345678/json/")
      .replyOnce(500, {});
    const address = await GetAddressViaCep("12345678");
    expect(address).toBeUndefined();
  });

  test("should stopping application when address is not found", async () => {
    mockAxios
      .onGet("https://viacep.com.br/ws/12345678/json/")
      .replyOnce(200, {});
    const address = await GetAddressViaCep("12345678");
    expect(address).toBeUndefined();
  });
});
