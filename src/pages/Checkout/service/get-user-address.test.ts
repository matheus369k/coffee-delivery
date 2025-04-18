import { api } from "@lib/api";
import AxiosMockAdapter from "axios-mock-adapter";
import { GetUserAddress, type AddressType } from "./get-user-address";

const mockApi = new AxiosMockAdapter(api);
jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));

describe("GetUserAddress", () => {
  const defaultAddressResponse: AddressType = {
    cep: "12345678",
    street: "Rua A",
    complement: "Complemento A",
    neighborhood: "Bairro A",
    city: "Cidade A",
    number: 123,
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
    mockApi.reset();
  });

  test("should render correctly", async () => {
    mockApi
      .onGet("/user/123")
      .replyOnce(200, { address: defaultAddressResponse });
    const address = await GetUserAddress("123");
    expect(address).toMatchObject(defaultAddressResponse);
  });

  test("shouldn't break application when request to erros", async () => {
    mockApi.onGet("/user/123").replyOnce(500, {});
    const address = await GetUserAddress("123");
    expect(address).toBeUndefined();
  });

  test("should stopping application when address is not found", async () => {
    mockApi.onGet("/user/123").replyOnce(200, {});
    const address = await GetUserAddress("123");
    expect(address).toBeUndefined();
  });
});
