import AxiosMockAdapter from "axios-mock-adapter";
import { RegisterAddress } from "./register-address";
import axios from "axios";
import { api } from "@lib/api";

const mockApi = new AxiosMockAdapter(api);
jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));

describe("RegisterAddress", () => {
  const defaultProps = {
    cep: "12345678",
    street: "Rua Teste",
    number: 123,
    complement: "Complemento Teste",
    uf: "SP",
    city: "São Paulo",
    neighborhood: "Bairro Teste",
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
    window.localStorage.clear();
  });

  test("should render correctly", async () => {
    mockApi.onPost("/user/register").replyOnce(200, { addressId: "321" });
    const result = await RegisterAddress({ address: defaultProps });
    expect(result).toBe("321");
    expect(window.localStorage.addressId).toBeDefined();
  });

  test("should break application when request to erros", async () => {
    mockApi.onPost("/user/register").replyOnce(500, {});
    await RegisterAddress({ address: defaultProps });
    expect(window.localStorage.addressId).toBeUndefined();
  });

  test("should stopping application when addressId is not found", async () => {
    mockApi.onPost("/user/register").replyOnce(200, {});
    await RegisterAddress({ address: defaultProps });
    expect(window.localStorage.addressId).toBeUndefined();
  });
});
