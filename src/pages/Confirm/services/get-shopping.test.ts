import { api } from "@lib/api";
import AxiosMockAdapter from "axios-mock-adapter";
import { getShopping } from "./get-shopping";

const mockApi = new AxiosMockAdapter(api);
jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));

describe("getShopping", () => {
  const defaultResponse = {
    form_of_payment: "Cartão de debito",
    addresses: {
      cep: 55010010,
      city: "City Teste",
      complement: "House Teste",
      id: "123",
      neighborhood: "Neighborhood Teste",
      number: 45,
      street: "Street Teste",
      uf: "TS",
    },
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
      .onGet("/shopping/123")
      .replyOnce(200, { shopping: defaultResponse });
    const result = await getShopping("123");
    expect(result).toMatchObject(defaultResponse);
  });

  test("shouldn't break application when request to erros", async () => {
    mockApi.onGet("/shopping/123").replyOnce(500, {});
    const result = await getShopping("123");
    expect(result).toBeUndefined();
  });

  test("should stopping application when address is not found", async () => {
    mockApi.onGet("/shopping/123").replyOnce(200, {});
    const result = await getShopping("123");
    expect(result).toBeUndefined();
  });
});
