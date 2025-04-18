import { fireEvent, render, screen } from "@testing-library/react";
import { FormUser } from ".";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { act } from "react";
import { api } from "@lib/api";

jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));
const mockAxios = new AxiosMockAdapter(axios);
const mockApi = new AxiosMockAdapter(api);
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const hookForm = useForm();
  return <FormProvider {...hookForm}>{children}</FormProvider>;
};

describe("FormUser", () => {
  const spyConsole = jest.spyOn(console, "log");
  beforeAll(() => {
    spyConsole.mockImplementation(() => {});
  });
  afterAll(() => {
    spyConsole.mockRestore();
  });

  test("should render correctly", () => {
    render(<FormUser />, {
      wrapper,
    });
    screen.getByRole("heading", { name: /Complete seu pedido/i });
    screen.getByText(/Informe o endereço onde deseja receber seu pedido/i);
    screen.getByText(
      /O pagamento é feito na entrega. Escolha a forma que deseja pagar/i
    );
    const inputCEP = screen.getByRole("spinbutton", { name: /cep/i });
    expect(inputCEP).not.toBeDisabled();
  });

  test("should auto complete address when is called digite a cep with viacep", async () => {
    const defaultResponseViacep = {
      logradouro: "Rua Teste",
      complemento: "Complemento Teste",
      bairro: "Bairro Teste",
      localidade: "Cidade Teste",
      uf: "UF Teste",
    };
    mockAxios
      .onGet("https://viacep.com.br/ws/12345678/json/")
      .reply(200, { ...defaultResponseViacep });
    render(<FormUser />, {
      wrapper,
    });
    const inputCEP = screen.getByRole("spinbutton", { name: /cep/i });

    act(() => {
      fireEvent.change(inputCEP, { target: { value: "12345678" } });
    });

    const inputStreet = await screen.findByRole("textbox", {
      name: /street/i,
    });
    expect(inputStreet).toHaveValue(defaultResponseViacep.logradouro);
    const inputComplement = screen.getByRole("textbox", {
      name: /complement/i,
    });
    expect(inputComplement).toHaveValue(defaultResponseViacep.complemento);
    const inputNeighborhood = screen.getByRole("textbox", {
      name: /neighborhood/i,
    });
    expect(inputNeighborhood).toHaveValue(defaultResponseViacep.bairro);
    const inputCity = screen.getByRole("textbox", {
      name: /city/i,
    });
    expect(inputCity).toHaveValue(defaultResponseViacep.localidade);
    const inputUF = screen.getByRole("textbox", { name: /uf/i });
    expect(inputUF).toHaveValue(defaultResponseViacep.uf);
  });

  test("should auto complete address when have register address on database", async () => {
    const defaultResponse = {
      cep: 12345678,
      number: 25,
      street: "Rua Teste",
      complement: "Complemento Teste",
      neighborhood: "Bairro Teste",
      city: "Cidade Teste",
      uf: "UF Teste",
    };
    window.localStorage.setItem(
      "addressId",
      JSON.stringify(defaultResponse.cep)
    );
    mockApi.onGet("/user/12345678").reply(200, { address: defaultResponse });
    render(<FormUser />, {
      wrapper,
    });

    const inputCEP = await screen.findByRole("spinbutton", { name: /cep/i });
    expect(inputCEP).toHaveValue(defaultResponse.cep);
    const inputHouseNumber = screen.getByRole("spinbutton", {
      name: /house number/i,
    });
    expect(inputHouseNumber).toHaveValue(defaultResponse.number);
    const inputStreet = screen.getByRole("textbox", {
      name: /street/i,
    });
    expect(inputStreet).toHaveValue(defaultResponse.street);
    const inputComplement = screen.getByRole("textbox", {
      name: /complement/i,
    });
    expect(inputComplement).toHaveValue(defaultResponse.complement);
    const inputNeighborhood = screen.getByRole("textbox", {
      name: /neighborhood/i,
    });
    expect(inputNeighborhood).toHaveValue(defaultResponse.neighborhood);
    const inputCity = screen.getByRole("textbox", {
      name: /city/i,
    });
    expect(inputCity).toHaveValue(defaultResponse.city);
    const inputUF = screen.getByRole("textbox", { name: /uf/i });
    expect(inputUF).toHaveValue(defaultResponse.uf);

    window.localStorage.removeItem("addressId");
  });

  test("should initial field is blocked when have register address on database", async () => {
    const defaultResponse = {
      cep: 12345678,
      number: 25,
      street: "Rua Teste",
      complement: "Complemento Teste",
      neighborhood: "Bairro Teste",
      city: "Cidade Teste",
      uf: "UF Teste",
    };
    window.localStorage.setItem(
      "addressId",
      JSON.stringify(defaultResponse.cep)
    );
    mockApi.onGet("/user/12345678").reply(200, { address: defaultResponse });
    render(<FormUser />, {
      wrapper,
    });
    const inputCEP = await screen.findByRole("spinbutton", { name: /cep/i });

    expect(inputCEP).toHaveProperty("readOnly", true);
    window.localStorage.removeItem("addressId");
  });

  test("should unlocked field  when is clicked in the button Editar", async () => {
    const defaultResponse = {
      cep: 12345678,
      number: 25,
      street: "Rua Teste",
      complement: "Complemento Teste",
      neighborhood: "Bairro Teste",
      city: "Cidade Teste",
      uf: "UF Teste",
    };
    window.localStorage.setItem(
      "addressId",
      JSON.stringify(defaultResponse.cep)
    );
    mockApi.onGet("/user/12345678").reply(200, { address: defaultResponse });
    render(<FormUser />, {
      wrapper,
    });
    const buttonEdit = await screen.findByRole("button", { name: /editar/i });

    fireEvent.click(buttonEdit);

    const inputCEP = screen.getByRole("spinbutton", { name: /cep/i });
    expect(inputCEP).toHaveProperty("readOnly", false);

    window.localStorage.removeItem("addressId");
  });
});
