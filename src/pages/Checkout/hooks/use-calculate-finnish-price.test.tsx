import { renderHook } from "@testing-library/react";
import { useCalculateFinnishPrice } from "./use-calculate-finnish-price";
import type { ReactNode } from "react";
import {
  CartCoffeeContext,
  type CartCoffeeType,
} from "@contexts/cart-coffee-context";

const wrapper = ({
  children,
  cartCoffee,
}: {
  children: ReactNode;
  cartCoffee: CartCoffeeType[];
}) => (
  <CartCoffeeContext.Provider
    value={{
      cartCoffee,
      RemoveCoffeeToCart: jest.fn(),
      AddCoffeeToCart: jest.fn(),
      ResetCoffeeCart: jest.fn(),
    }}
  >
    {children}
  </CartCoffeeContext.Provider>
);

describe("useCalculateFinnishPrice", () => {
  const defaultCartCoffee = [
    {
      id: "1",
      name: "Expresso Tradicional",
      image: "https://i.imgur.com/456789.png",
      count: 2,
      total_price: "10.00",
    },
  ];

  test("should render correctly", () => {
    const { result } = renderHook(useCalculateFinnishPrice, {
      wrapper: ({ children }) => {
        return wrapper({ children, cartCoffee: defaultCartCoffee });
      },
    });
    expect(result.current.priceTotal).toMatchObject({
      priceEnd: "23.50",
      Products: "20.00",
      taxa: "3.50",
    });
  });

  test("should calculate the end total with many products", () => {
    const manyCartCoffee = [
      ...defaultCartCoffee,
      {
        id: "2",
        name: "Expresso Tradicional",
        image: "https://i.imgur.com/456789.png",
        count: 3,
        total_price: "10.00",
      },
    ];
    const { result } = renderHook(useCalculateFinnishPrice, {
      wrapper: ({ children }) => {
        return wrapper({ children, cartCoffee: manyCartCoffee });
      },
    });
    expect(result.current.priceTotal).toMatchObject({
      priceEnd: "53.50",
      Products: "50.00",
      taxa: "3.50",
    });
  });

  test("shouldn't update the price when the cart is empty", () => {
    const { result } = renderHook(useCalculateFinnishPrice, {
      wrapper: ({ children }) => {
        return wrapper({ children, cartCoffee: [] });
      },
    });
    expect(result.current.priceTotal).toMatchObject({
      priceEnd: "0.00",
      Products: "0.00",
      taxa: "3.50",
    });
  });
});
