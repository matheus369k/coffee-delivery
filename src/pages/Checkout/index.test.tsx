import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkout } from ".";
import type { ReactNode } from "react";
import { PaymentTypeContextProvider } from "@contexts/payment-type-context";
import {
  CartCoffeeContext,
  type CartCoffeeType,
} from "@contexts/cart-coffee-context";
import AxiosMockAdapter from "axios-mock-adapter";
import { api } from "@lib/api";
import axios from "axios";

const mockAxios = new AxiosMockAdapter(axios);
const mockApi = new AxiosMockAdapter(api);
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));
jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));

const wrapper = ({
  children,
  cartCoffee,
  ResetCoffeeCart = jest.fn(),
  AddCoffeeToCart = jest.fn(),
  RemoveCoffeeToCart = jest.fn(),
}: {
  children: ReactNode;
  cartCoffee: CartCoffeeType[];
  ResetCoffeeCart?: () => void;
  AddCoffeeToCart?: () => void;
  RemoveCoffeeToCart?: () => void;
}) => (
  <PaymentTypeContextProvider>
    <CartCoffeeContext.Provider
      value={{
        cartCoffee,
        ResetCoffeeCart,
        AddCoffeeToCart,
        RemoveCoffeeToCart,
      }}
    >
      {children}
    </CartCoffeeContext.Provider>
  </PaymentTypeContextProvider>
);

describe("Checkout", () => {
  const defaultResponseViacep = {
    logradouro: "Rua Teste",
    complemento: "Complemento Teste",
    bairro: "Bairro Teste",
    localidade: "Cidade Teste",
    uf: "UF Teste",
  };
  const defaultCartCoffee = [
    {
      id: "1",
      name: "Expresso Tradicional",
      total_price: "9.90",
      count: 1,
      image: "expresso.png",
    },
  ];
  const spyConsoleLog = jest.spyOn(console, "log");
  const spyConsoleErr = jest.spyOn(console, "error");

  beforeAll(() => {
    spyConsoleLog.mockImplementation(() => {});
    spyConsoleErr.mockImplementation(() => {});
  });

  afterAll(() => {
    spyConsoleLog.mockRestore();
    spyConsoleErr.mockRestore();
  });

  afterEach(() => {
    mockApi.reset();
    mockAxios.reset();
    window.localStorage.clear();
  });

  test("should render checkout page correctly", () => {
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: defaultCartCoffee,
        });
      },
    });
    screen.getByRole("heading", { level: 3, name: /Cafés selecionados/i });
    screen.getByText(/Informe o endereço onde deseja receber seu pedido/i);
    screen.getByText(
      /O pagamento é feito na entrega. Escolha a forma que deseja pagar/i
    );
    screen.getByRole("heading", { level: 4, name: /Expresso Tradicional/i });
    screen.getByRole("button", { name: /confirmar pedido/i });
  });

  test("should render NotFound Component when cartCoffee is empty", () => {
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: [],
        });
      },
    });
    screen.getByText(/Adicione produtos ao carrinho!/i);
  });

  test("should should render multiply coffee cards", () => {
    const manyCartCoffee = [
      ...defaultCartCoffee,
      {
        id: "2",
        name: "Café com Leite",
        total_price: "9.90",
        count: 1,
        image: "expresso.png",
      },
    ];
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: manyCartCoffee,
        });
      },
    });
    screen.getByRole("heading", { level: 3, name: /Cafés selecionados/i });
    screen.getByRole("heading", { level: 4, name: /Expresso Tradicional/i });
    screen.getByRole("heading", { level: 4, name: /Café com Leite/i });
  });

  test('should call RemoveCoffeeToCart correctly and reset count when click button "Remover"', async () => {
    const user = userEvent.setup();
    const mockRemoveCoffeeToCart = jest.fn();
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: defaultCartCoffee,
          RemoveCoffeeToCart: mockRemoveCoffeeToCart,
        });
      },
    });
    const inputCount = screen.getByRole("spinbutton", {
      name: /count/i,
    });
    const buttonRemoveCoffee = screen.getByRole("button", {
      name: /remove/i,
    });

    await user.type(inputCount, "2");
    await user.click(buttonRemoveCoffee);

    expect(mockRemoveCoffeeToCart).toHaveBeenCalledWith({
      id: "1",
      price: "9.90",
    });
    expect(inputCount).toHaveValue(1);
  });

  test("shouldn't showing correctly prices of the products", () => {
    const manyCartCoffee = [
      ...defaultCartCoffee,
      {
        id: "2",
        name: "Café com Leite",
        total_price: "9.90",
        count: 1,
        image: "expresso.png",
      },
    ];
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: manyCartCoffee,
        });
      },
    });
    screen.getByText(/3.50/i);
    screen.getByText(/19.80/i);
    screen.getByText(/23.30/i);
  });

  test("shouldn't do submitted when click button 'Confirmar pedido' if something field is empty", async () => {
    const user = userEvent.setup();
    mockAxios.onGet("https://viacep.com.br/ws/12345678/json/").reply(200, {
      ...defaultResponseViacep,
    });
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: defaultCartCoffee,
        });
      },
    });
    const buttonSubmit = screen.getByRole("button", {
      name: /confirmar pedido/i,
    });
    const inputCep = screen.getByRole("spinbutton", { name: /cep/i });
    const creditCard = screen.getByRole("button", { name: /credit_card/i });
    const inputNumber = screen.getByRole("spinbutton", {
      name: /house number/i,
    });

    await user.type(inputCep, "12345678");
    await user.click(creditCard);
    await user.click(buttonSubmit);

    expect(inputNumber).toHaveFocus();
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });

  test("should submitted when click button 'Confirmar pedido' if everything field is complete", async () => {
    const user = userEvent.setup();
    mockAxios.onGet("https://viacep.com.br/ws/12345678/json/").reply(200, {
      ...defaultResponseViacep,
    });
    mockApi.onPost("/user/register").reply(200, { addressId: 123 });
    mockApi.onPost("/shopping/123").reply(200, { shoppingId: 321 });
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: defaultCartCoffee,
        });
      },
    });
    const buttonSubmit = screen.getByRole("button", {
      name: /confirmar pedido/i,
    });
    const inputCep = screen.getByRole("spinbutton", { name: /cep/i });
    const creditCard = screen.getByRole("button", { name: /credit_card/i });
    const inputNumber = screen.getByRole("spinbutton", {
      name: /house number/i,
    });

    await user.type(inputCep, "12345678");
    await user.type(inputNumber, "123");
    await user.click(creditCard);
    await user.click(buttonSubmit);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockApi.history.post[1].url).toBe("/shopping/123");
    expect(JSON.parse(mockApi.history.post[1].data)).toMatchObject({
      coffees_list: defaultCartCoffee.map((coffee) => ({
        name: coffee.name,
        total_price: coffee.total_price,
        count: coffee.count,
        image: coffee.image,
      })),
      form_of_payment: "Cartão de crédito",
    });
  });

  test("should call register Address when confirm buy and not have addressId save in localStorage", async () => {
    const user = userEvent.setup();
    mockAxios.onGet("https://viacep.com.br/ws/12345678/json/").reply(200, {
      ...defaultResponseViacep,
    });
    mockApi.onPost("/user/register").reply(200, { addressId: 123 });
    mockApi.onPost("/shopping/123").reply(200, { shoppingId: 321 });
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: defaultCartCoffee,
        });
      },
    });
    const buttonSubmit = screen.getByRole("button", {
      name: /confirmar pedido/i,
    });
    const inputCep = screen.getByRole("spinbutton", { name: /cep/i });
    const creditCard = screen.getByRole("button", { name: /credit_card/i });
    const inputNumber = screen.getByRole("spinbutton", {
      name: /house number/i,
    });

    await user.type(inputCep, "12345678");
    await user.type(inputNumber, "123");
    await user.click(creditCard);
    await user.click(buttonSubmit);

    expect(mockApi.history.post[0].url).toBe("/user/register");
    expect(JSON.parse(mockApi.history.post[0].data)).toMatchObject({
      cep: "12345678",
      number: 123,
      complement: defaultResponseViacep.complemento,
      neighborhood: defaultResponseViacep.bairro,
      city: defaultResponseViacep.localidade,
      uf: defaultResponseViacep.uf,
      street: defaultResponseViacep.logradouro,
    });
  });

  test("should call update Address when confirm buy and have addressId and editeAddress of the localStorage", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem("addressId", "123");
    window.sessionStorage.setItem("editeAddress", "true");
    mockAxios.onGet("https://viacep.com.br/ws/12345678/json/").reply(200, {
      ...defaultResponseViacep,
    });
    mockApi.onPut("/user/123").reply(200);
    mockApi.onPost("/shopping/123").reply(200, { shoppingId: 321 });
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: defaultCartCoffee,
        });
      },
    });
    const buttonSubmit = screen.getByRole("button", {
      name: /confirmar pedido/i,
    });
    const inputCep = screen.getByRole("spinbutton", { name: /cep/i });
    const creditCard = screen.getByRole("button", { name: /credit_card/i });
    const inputNumber = screen.getByRole("spinbutton", {
      name: /house number/i,
    });

    await user.type(inputCep, "12345678");
    await user.type(inputNumber, "123");
    await user.click(creditCard);
    await user.click(buttonSubmit);

    expect(mockApi.history.put[0].url).toBe("/user/123");
    expect(JSON.parse(mockApi.history.put[0].data)).toMatchObject({
      cep: "12345678",
      number: 123,
      complement: defaultResponseViacep.complemento,
      neighborhood: defaultResponseViacep.bairro,
      city: defaultResponseViacep.localidade,
      uf: defaultResponseViacep.uf,
      street: defaultResponseViacep.logradouro,
    });
    expect(window.sessionStorage.editeAddress).toBeUndefined();
  });

  test("should reset context and navigate to confirm when finished buy", async () => {
    const user = userEvent.setup();
    mockAxios.onGet("https://viacep.com.br/ws/12345678/json/").reply(200, {
      ...defaultResponseViacep,
    });
    mockApi.onPost("/user/register").reply(200, { addressId: 123 });
    mockApi.onPost("/shopping/123").reply(200, { shoppingId: 321 });
    const mockResetCoffeeCart = jest.fn();
    render(<Checkout />, {
      wrapper: ({ children }) => {
        return wrapper({
          children,
          cartCoffee: defaultCartCoffee,
          ResetCoffeeCart: mockResetCoffeeCart,
        });
      },
    });
    const buttonSubmit = screen.getByRole("button", {
      name: /confirmar pedido/i,
    });
    const inputCep = screen.getByRole("spinbutton", { name: /cep/i });
    const creditCard = screen.getByRole("button", { name: /credit_card/i });
    const inputNumber = screen.getByRole("spinbutton", {
      name: /house number/i,
    });

    await user.type(inputCep, "12345678");
    await user.type(inputNumber, "123");
    await user.click(creditCard);
    await user.click(buttonSubmit);

    expect(mockNavigate).toHaveBeenCalledWith("/coffee-delivery/confirm");
    expect(mockResetCoffeeCart).toHaveBeenCalledTimes(1);
  });
});
