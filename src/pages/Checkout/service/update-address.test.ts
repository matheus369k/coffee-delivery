import AxiosMockAdapter from "axios-mock-adapter";
import { UpdateAddress } from "./update-address";
import axios from "axios";
import { api } from "@lib/api";

const mockApi = new AxiosMockAdapter(api);
jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));

describe("UpdateAddress", () => {
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
    window.sessionStorage.clear();
  });

  test("should render correctly", async () => {
    window.sessionStorage.setItem("editeAddress", "true");
    mockApi.onPut("/user/321").replyOnce(200, {});
    await UpdateAddress({ address: defaultProps, addressId: "321" });
    expect(window.sessionStorage.editeAddress).toBeUndefined();
  });

  test("should break application when request to erros", async () => {
    window.sessionStorage.setItem("editeAddress", "true");
    mockApi.onPut("/user/321").replyOnce(500, {});
    await UpdateAddress({ address: defaultProps, addressId: "321" });
    expect(window.sessionStorage.editeAddress).toBeDefined();
  });
});
