import { render, configure, screen } from "@testing-library/react";
import { Header } from ".";
import AxiosMockAdapter from "axios-mock-adapter";
import { api } from "@lib/api";
import {
  CartCoffeeContext,
  CartCoffeeType,
  CartCoffeeContextType,
} from "@contexts/cart-coffee-context";
import userEvent from "@testing-library/user-event";

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
  cartCoffee = [],
}: {
  children: React.ReactNode;
  cartCoffee?: CartCoffeeType[];
}) => (
  <CartCoffeeContext.Provider
    value={
      {
        cartCoffee,
      } as unknown as CartCoffeeContextType
    }
  >
    {children}
  </CartCoffeeContext.Provider>
);

describe("Header", () => {
  afterEach(() => {
    mockApi.reset();
  });

  test("should render correctly", () => {
    const useLocation = jest.spyOn(window, "location", "get");
    useLocation.mockImplementation(
      () =>
        ({
          pathname: "/coffee-delivery",
        } as Location)
    );
    render(<Header />, {
      wrapper,
    });
    screen.getByAltText(
      /A imagem e uma logo que representa uma silhueta de um copo de café escrito ao lado 'Coffee delivery'/i
    );
    screen.getByRole("button", { name: /cart/i });
    const buttonBack = screen.queryByRole("button", { name: /arrow back/i });
    expect(buttonBack).toBeNull();
    screen.getByText(/Cidade, UF/i);
    useLocation.mockRestore();
  });

  test("should showing arrow back when page is not home", () => {
    const useLocation = jest.spyOn(window, "location", "get");
    useLocation.mockImplementation(
      () =>
        ({
          pathname: "/coffee-delivery",
        } as Location)
    );
    render(<Header />, {
      wrapper,
    });
    screen.queryByRole("button", { name: /arrow back/i });
    useLocation.mockRestore();
  });

  test("should redirected with home page when clicked in button logo", async () => {
    const user = userEvent.setup();
    render(<Header />, {
      wrapper,
    });
    const buttonLogo = screen.getByAltText(
      /A imagem e uma logo que representa uma silhueta de um copo de café escrito ao lado 'Coffee delivery'/i
    );

    await user.click(buttonLogo);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/coffee-delivery");
  });

  test("should redirected to checkout page when clicked in button cart", async () => {
    const user = userEvent.setup();
    render(<Header />, {
      wrapper,
    });
    const buttonCart = screen.getByRole("button", { name: /cart/i });

    await user.click(buttonCart);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/coffee-delivery/checkout");
  });

  test("should button cart showing quantity of coffee in cart", async () => {
    render(<Header />, {
      wrapper: ({ children }) =>
        wrapper({
          children,
          cartCoffee: [
            {
              id: "1",
              name: "Expresso Tradicional",
              total_price: "9.90",
              image: "expresso.png",
              count: 1,
            },
            {
              id: "2",
              name: "Expresso Americano",
              total_price: "9.90",
              image: "expresso.png",
              count: 1,
            },
          ],
        }),
    });
    const buttonCart = screen.getByRole("button", { name: /cart/i });
    expect(buttonCart).toHaveAttribute("data-count-products", "2");
  });

  test("should showing city and uf when has addressId register in the localStorage", async () => {
    mockApi.onGet("/location/123").reply(200, {
      userLocation: {
        city: "São Paulo",
        uf: "SP",
      },
    });
    localStorage.setItem("addressId", "123");
    render(<Header />, {
      wrapper,
    });
    await screen.findByText(/São Paulo, SP/i);
    localStorage.removeItem("addressId");
  });

  test("shouldn't update location state when addressId is not in the localStorage", async () => {
    mockApi.onGet("/location/123").reply(200, {
      userLocation: {
        city: "São Paulo",
        uf: "SP",
      },
    });
    localStorage.removeItem("addressId");
    render(<Header />, {
      wrapper,
    });
    await screen.findByText(/Cidade, UF/i);
    localStorage.removeItem("addressId");
  });

  test("shouldn't update location state when api return error", async () => {
    mockApi.onGet("/location/123").reply(500, {});
    localStorage.setItem("addressId", "123");
    render(<Header />, {
      wrapper,
    });
    await screen.findByText(/Cidade, UF/i);
    localStorage.removeItem("addressId");
  });

  test("shouldn't update location when data not found", async ()=>{
    mockApi.onGet("/location/123").reply(200, {userLocation: undefined});
    localStorage.setItem("addressId", "123");
    render(<Header />, {
      wrapper,
    });
    await screen.findByText(/Cidade, UF/i);
    localStorage.removeItem("addressId");
  });
});
