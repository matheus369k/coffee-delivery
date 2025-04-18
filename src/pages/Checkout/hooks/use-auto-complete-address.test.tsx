import { fireEvent, renderHook, screen } from "@testing-library/react";
import { useAutoCompleteAddress } from "./use-auto-complete-address";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { api } from "@lib/api";
import React, { act } from "react";

jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));
const mockAxios = new AxiosMockAdapter(axios);
const mockApi = new AxiosMockAdapter(api);
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const hookForm = useForm({
    defaultValues: {
      cep: "",
    },
  });
  return (
    <FormProvider {...hookForm}>
      {children}
      <input {...hookForm.register("cep")} aria-label="cep" type="text" />
    </FormProvider>
  );
};

describe("useAutoCompleteAddress", () => {
  const defaultProps = {
    city: "",
    complement: "",
    neighborhood: "",
    street: "",
    uf: "",
  };
  const defaultResponseViacep = {
    logradouro: "Rua Teste",
    complemento: "Complemento Teste",
    bairro: "Bairro Teste",
    localidade: "Cidade Teste",
    uf: "UF Teste",
  };
  const defaultResponseDatabase = {
    cep: 12345678,
    number: 25,
    street: "Rua Teste",
    complement: "Complemento Teste",
    neighborhood: "Bairro Teste",
    city: "Cidade Teste",
    uf: "UF Teste",
  };
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
    mockAxios.reset();
    mockApi.reset();
  });

  test("should render with default flow", () => {
    const { result } = renderHook(useAutoCompleteAddress, {
      wrapper,
    });
    expect(result.current.address).toMatchObject(defaultProps);
    expect(result.current.hasEditeAddress).toBe(true);
    expect(result.current.handleHasEditeAddress).toBeDefined();
    expect(result.current.isValideCep).toBeDefined();
    expect(result.current.autoCompleteAddress).toBeDefined();
    expect(result.current.autoCompleteAddressViaCep).toBeDefined();
  });

  test("should update address when called autoCompleteAddress correctly", async () => {
    mockApi.onGet("/user/123").reply(200, {
      address: defaultResponseDatabase,
    });
    const { result } = renderHook(useAutoCompleteAddress, {
      wrapper,
    });
    await act(async () => {
      await result.current.autoCompleteAddress("123");
    });
    expect(result.current.address).toMatchObject(defaultResponseDatabase);
  });

  test("shouldn't update address when called autoCompleteAddress more one time", async () => {
    mockApi.onGet("/user/123").reply(200, {
      address: defaultResponseDatabase,
    });
    const { result } = renderHook(useAutoCompleteAddress, {
      wrapper,
    });
    await act(async () => {
      await result.current.autoCompleteAddress("123");
    });
    mockApi.onGet("/user/123").reply(200, {
      address: {
        ...defaultResponseDatabase,
        cep: 87654321,
      },
    });
    const inputCEP = screen.getByRole("textbox", { name: /cep/i });
    await act(async () => {
      fireEvent.change(inputCEP, { target: { value: "87654321" } });
      await result.current.autoCompleteAddress("123");
    });
    expect(result.current.address).toMatchObject(defaultResponseDatabase);
  });

  test("shouldn't update address when called autoCompleteAddress but without datas", async () => {
    mockApi.onGet("/user/123").reply(200, {});
    const { result } = renderHook(useAutoCompleteAddress, {
      wrapper,
    });
    await act(async () => {
      await result.current.autoCompleteAddress("123");
    });
    expect(result.current.address).toMatchObject(defaultProps);
  });

  test("should update address when called autoCompleteAddressViacep correctly", async () => {
    mockAxios
      .onGet("https://viacep.com.br/ws/12345678/json/")
      .reply(200, { ...defaultResponseViacep });
    const { result } = renderHook(useAutoCompleteAddress, {
      wrapper,
    });
    const inputCEP = screen.getByRole("textbox", { name: /cep/i });
    await act(async () => {
      fireEvent.change(inputCEP, {
        target: { value: "12345678" },
      });
      await result.current.autoCompleteAddressViaCep();
    });
    expect(result.current.address).toMatchObject({
      city: defaultResponseViacep.localidade,
      complement: defaultResponseViacep.complemento,
      neighborhood: defaultResponseViacep.bairro,
      street: defaultResponseViacep.logradouro,
      uf: defaultResponseViacep.uf,
    });
  });

  test("shouldn't update address when called autoCompleteAddressViacep but without datas", async () => {
    mockApi.onGet("https://viacep.com.br/ws/12345678/json/").reply(200, {});
    const { result } = renderHook(useAutoCompleteAddress, {
      wrapper,
    });
    const inputCEP = screen.getByRole("textbox", { name: /cep/i });
    await act(async () => {
      fireEvent.change(inputCEP, {
        target: { value: "12345678" },
      });
      await result.current.autoCompleteAddressViaCep();
    });
    expect(result.current.address).toMatchObject(defaultProps);
  });

  test("should update hasEditeAddress to true when called handleHasEditeAddress", async () => {
    mockApi.onGet("/user/123").reply(200, {
      address: defaultResponseDatabase,
    });
    const { result } = renderHook(useAutoCompleteAddress, {
      wrapper,
    });
    await act(async () => {
      await result.current.autoCompleteAddress("123");
    });
    expect(result.current.hasEditeAddress).toBe(false);
    act(() => {
      result.current.handleHasEditeAddress();
    });
    expect(result.current.hasEditeAddress).toBe(true);
    expect(window.sessionStorage.editeAddress).toBeDefined();
  });

  test("should detected invalid cep when called isValideCep", async () => {
    const { result } = renderHook(useAutoCompleteAddress, {
      wrapper,
    });
    const inputCEP = screen.getByRole("textbox", { name: /cep/i });
    await act(async () => {
      fireEvent.change(inputCEP, {
        target: { value: "123" },
      });
    });
    expect(result.current.isValideCep).toBe(false);
  });

  test("should detected valid cep when called isValideCep", async () => {
    const { result } = renderHook(useAutoCompleteAddress, {
      wrapper,
    });
    const inputCEP = screen.getByRole("textbox", { name: /cep/i });
    await act(async () => {
      fireEvent.change(inputCEP, {
        target: { value: "12345678" },
      });
    });
    expect(result.current.isValideCep).toBe(true);
  });
});
