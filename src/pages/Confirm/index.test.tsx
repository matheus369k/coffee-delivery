import { render, screen, waitFor } from "@testing-library/react";
import { Confirm } from "@pages/Confirm";
import { CurrencyDollar, MapPin, Timer } from "@phosphor-icons/react";
import illustration from "@assets/Illustration.png";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AxiosMockAdapter from "axios-mock-adapter";
import { api } from "@lib/api";

jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));
jest.mock("@phosphor-icons/react", () => {
  return {
    MapPin: jest.fn(),
    Timer: jest.fn(),
    CurrencyDollar: jest.fn(),
  };
});
const mockApi = new AxiosMockAdapter(api);
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Confirm page", () => {
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

  beforeEach(() => {
    window.localStorage.setItem("shoppingId", defaultResponse.addresses.id);
  });

  afterEach(() => {
    window.localStorage.clear();
    queryClient.clear();
    mockApi.reset();
  });

  test("should render correctly", async () => {
    mockApi
      .onGet(`/shopping/${defaultResponse.addresses.id}`)
      .replyOnce(200, { shopping: defaultResponse });
    render(<Confirm />, { wrapper });
    await screen.findByRole("heading", {
      level: 2,
      name: /Uhu! Pedido confirmado/i,
    });
    screen.getByText(/Agora é só aguardar que logo o café chegará até você/i, {
      exact: false,
    });
    screen.getByText(/Entrega em/i, { exact: false });
    screen.getByText(/Previsão de entrega/i, { exact: false });
    screen.getByText(/Pagamento na entrega/i, {
      exact: false,
    });
    screen.getByRole("img", { name: /Illustration/i });
  });

  test("should render all icons with corrected props", async () => {
    mockApi
      .onGet(`/shopping/${defaultResponse.addresses.id}`)
      .replyOnce(200, { shopping: defaultResponse });
    render(<Confirm />, { wrapper });
    await waitFor(() => {
      const defaultProps = {
        size: "16px",
        weight: "fill",
      };
      expect(Timer).toHaveBeenCalledWith(defaultProps, {});
      expect(MapPin).toHaveBeenCalledWith(defaultProps, {});
      expect(CurrencyDollar).toHaveBeenCalledWith(defaultProps, {});
    });
  });

  test("should render all dynamic data", async () => {
    mockApi
      .onGet(`/shopping/${defaultResponse.addresses.id}`)
      .replyOnce(200, { shopping: defaultResponse });
    const { addresses, form_of_payment } = defaultResponse;
    render(<Confirm />, { wrapper });
    await screen.findByText(addresses.street, { exact: false });
    screen.getByText(addresses.number, { exact: false });
    screen.getByText(addresses.neighborhood, { exact: false });
    screen.getByText(addresses.city, { exact: false });
    screen.getByText(addresses.uf, { exact: false });
    screen.getByText(form_of_payment, { exact: false });
  });

  test("should render image with corrected src", async () => {
    mockApi
      .onGet(`/shopping/${defaultResponse.addresses.id}`)
      .replyOnce(200, { shopping: defaultResponse });
    render(<Confirm />, { wrapper });
    const image = await screen.findByRole("img", { name: /Illustration/i });
    expect(image).toHaveAttribute("src", illustration);
  });

  test("should render nothing if data is undefined", async () => {
    mockApi.onGet(`/shopping/${defaultResponse.addresses.id}`).replyOnce(200);
    render(<Confirm />, { wrapper });
    await waitFor(() => {
      const title = screen.queryByRole("heading", { level: 2 });
      expect(title).toBeNull();
      const paragraph = screen.queryByText(
        /Agora é só aguardar que logo o café chegará até você/i
      );
      expect(paragraph).toBeNull();
    });
  });

  test("should render nothing when isFeching is true", () => {
    mockApi.onGet(`/shopping/${defaultResponse.addresses.id}`).replyOnce(200);
    render(<Confirm />, { wrapper });
    const title = screen.queryByRole("heading", { level: 2 });
    expect(title).toBeNull();
    const paragraph = screen.queryByText(
      /Agora é só aguardar que logo o café chegará até você/i
    );
    expect(paragraph).toBeNull();
  });
});
