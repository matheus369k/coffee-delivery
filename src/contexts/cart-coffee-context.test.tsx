import { render, renderHook } from "@testing-library/react";
import {
  CartCoffeeContext,
  CartCoffeeContextProvider,
} from "./cart-coffee-context";
import { act, useContext, type ReactNode } from "react";

describe("CartCoffeeContextProvider", () => {
  const ComponentTest = ({ ...props }) => {
    const { AddCoffeeToCart, RemoveCoffeeToCart, cartCoffee, ResetCoffeeCart } =
      useContext(CartCoffeeContext);

    function handleRemoveCoffeeToCart() {
      RemoveCoffeeToCart({ ...props } as unknown as any);
    }

    function handleAddCoffeeToCart() {
      AddCoffeeToCart({ ...props } as unknown as any);
    }

    function handleResetCoffeeCart() {
      ResetCoffeeCart();
    }

    return (
      <>
        <h1>Test 1</h1>
        <button onClick={handleRemoveCoffeeToCart}>remove</button>
        <button onClick={handleAddCoffeeToCart}>add</button>
        <button onClick={handleResetCoffeeCart}>reset</button>
        <ul>
          {cartCoffee.map((coffee) => {
            return (
              <li key={coffee.id}>
                <p>{coffee.name}</p>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  test("should run correctly", () => {
    const { result } = renderHook(() => useContext(CartCoffeeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <CartCoffeeContextProvider>{children}</CartCoffeeContextProvider>
      ),
    });
    expect(result.current.cartCoffee).toEqual([]);
    expect(result.current.AddCoffeeToCart).toBeDefined();
    expect(result.current.RemoveCoffeeToCart).toBeDefined();
    expect(result.current.ResetCoffeeCart).toBeDefined();
  });
  test("should add new coffee to cart", () => {
    const { result } = renderHook(() => useContext(CartCoffeeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <CartCoffeeContextProvider>{children}</CartCoffeeContextProvider>
      ),
    });

    act(() => {
      result.current.AddCoffeeToCart({
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        price: "9.90",
      });
    });

    expect(result.current.cartCoffee).toEqual([
      {
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        total_price: "9,90",
        count: 1,
      },
    ]);
  });

  test("should increase count when has add duplicated coffee to cart", () => {
    const { result } = renderHook(() => useContext(CartCoffeeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <CartCoffeeContextProvider>{children}</CartCoffeeContextProvider>
      ),
    });

    act(() => {
      result.current.AddCoffeeToCart({
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        price: "9.90",
      });
      result.current.AddCoffeeToCart({
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        price: "9.90",
      });
    });

    expect(result.current.cartCoffee).toEqual([
      {
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        total_price: "19,80",
        count: 2,
      },
    ]);
  });

  test("should remove coffee to cart when count is 0", () => {
    const { result } = renderHook(() => useContext(CartCoffeeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <CartCoffeeContextProvider>{children}</CartCoffeeContextProvider>
      ),
    });

    act(() => {
      result.current.AddCoffeeToCart({
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        price: "9.90",
      });
      result.current.RemoveCoffeeToCart({ id: "1", price: "9.90" });
    });

    expect(result.current.cartCoffee).toEqual([]);
  });

  test("should decrease count when count is greater than 1", () => {
    const { result } = renderHook(() => useContext(CartCoffeeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <CartCoffeeContextProvider>{children}</CartCoffeeContextProvider>
      ),
    });

    act(() => {
      result.current.AddCoffeeToCart({
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        price: "9.90",
      });
      result.current.AddCoffeeToCart({
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        price: "9.90",
      });
      result.current.RemoveCoffeeToCart({ id: "1", price: "9.90" });
    });

    expect(result.current.cartCoffee).toEqual([
      {
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        total_price: "9,90",
        count: 1,
      },
    ]);
  });

  test("should reset cart coffee", () => {
    const { result } = renderHook(() => useContext(CartCoffeeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <CartCoffeeContextProvider>{children}</CartCoffeeContextProvider>
      ),
    });

    act(() => {
      result.current.AddCoffeeToCart({
        id: "1",
        name: "Expresso Tradicional",
        image: "expresso.png",
        price: "9.90",
      });
      result.current.AddCoffeeToCart({
        id: "2",
        name: "Expresso Tradicional",
        image: "expresso.png",
        price: "9.90",
      });
      result.current.ResetCoffeeCart();
    });

    expect(result.current.cartCoffee).toEqual([]);
  });
});
