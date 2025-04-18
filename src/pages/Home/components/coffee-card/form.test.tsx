import { render, screen } from "@testing-library/react";
import { CoffeeCardForm } from "./form";
import React from "react";
import { CartCoffeeContext } from "@contexts/cart-coffee-context";
import userEvent from "@testing-library/user-event";

const wrapper = ({
  children,
  AddCoffeeToCart = jest.fn(),
}: {
  children: React.ReactNode;
  AddCoffeeToCart?: () => void;
}) => {
  return (
    <CartCoffeeContext.Provider
      value={{
        AddCoffeeToCart,
        cartCoffee: [],
        RemoveCoffeeToCart: jest.fn(),
        ResetCoffeeCart: jest.fn(),
      }}
    >
      {children}
    </CartCoffeeContext.Provider>
  );
};

describe("CoffeeCardForm", () => {
  const defaultProps = {
    id: "1",
    image: "coffee.png",
    name: "Coffee",
    price: "9.90",
  };

  test("should render corrected", () => {
    render(<CoffeeCardForm {...defaultProps} />, {
      wrapper,
    });
    screen.getByRole("button", { name: /less/i });
    screen.getByRole("button", { name: /more/i });
    screen.getByRole("button", { name: /Add to cart/i });
    screen.getByRole("spinbutton", { name: /count/i });
  });

  test("should submitted form when clicked in add", async () => {
    const user = userEvent.setup();
    const mockAddCoffeeToCart = jest.fn();
    render(<CoffeeCardForm {...defaultProps} />, {
      wrapper: ({ children }) => {
        return wrapper({ children, AddCoffeeToCart: mockAddCoffeeToCart });
      },
    });
    const buttonAddCart = screen.getByRole("button", { name: /Add to cart/i });
    const inputCount = screen.getByRole("spinbutton", { name: /count/i });
    const buttonMore = screen.getByRole("button", { name: /more/i });

    await user.click(buttonMore);
    await user.click(buttonAddCart);

    expect(inputCount).toHaveValue(1);
    expect(mockAddCoffeeToCart).toHaveBeenCalledTimes(2);
    expect(mockAddCoffeeToCart).toHaveBeenCalledWith({
      id: defaultProps.id,
      image: defaultProps.image,
      name: defaultProps.name,
      price: defaultProps.price,
    });
  });

  test("should reset amount coffee to 1 after form submission", async () => {
    const user = userEvent.setup();
    render(<CoffeeCardForm {...defaultProps} />, {
      wrapper,
    });
    const buttonAddCart = screen.getByRole("button", { name: /Add to cart/i });
    const inputCount = screen.getByRole("spinbutton", { name: /count/i });
    const buttonMore = screen.getByRole("button", { name: /more/i });

    await user.click(buttonMore);
    await user.click(buttonAddCart);

    expect(inputCount).toHaveValue(1);
  });

  test("should add amount when more button is clicked", async () => {
    const user = userEvent.setup();
    render(<CoffeeCardForm {...defaultProps} />, { wrapper });
    const buttonMore = screen.getByRole("button", { name: /more/i });
    const inputCount = screen.getByRole("spinbutton", { name: /count/i });

    await user.click(buttonMore);

    expect(inputCount).toHaveValue(2);
  });

  test("should less amount when less button is clicked", async () => {
    const user = userEvent.setup();
    render(<CoffeeCardForm {...defaultProps} />, { wrapper });
    const buttonMore = screen.getByRole("button", { name: /more/i });
    const buttonLess = screen.getByRole("button", { name: /less/i });
    const inputCount = screen.getByRole("spinbutton", { name: /count/i });

    await user.click(buttonMore);
    await user.click(buttonMore);
    await user.click(buttonLess);

    expect(inputCount).toHaveValue(2);
  });

  test("should disability less button when amount coffee is 1", async () => {
    const user = userEvent.setup();
    render(<CoffeeCardForm {...defaultProps} />, { wrapper });
    const buttonLess = screen.getByRole("button", { name: /less/i });
    const inputCount = screen.getByRole("spinbutton", { name: /count/i });

    await user.click(buttonLess);
    await user.click(buttonLess);

    expect(buttonLess).toBeDisabled();
    expect(inputCount).toHaveValue(1);
  });

  test("should disability more button when amount coffee is 99", async () => {
    const spyState = jest.spyOn(React, "useState");
    spyState.mockReturnValue([99, jest.fn()]);
    const user = userEvent.setup();
    render(<CoffeeCardForm {...defaultProps} />, { wrapper });
    const inputCount = screen.getByRole("spinbutton", { name: /count/i });
    const buttonMore = screen.getByRole("button", { name: /more/i });

    await user.click(buttonMore);
    await user.click(buttonMore);

    expect(buttonMore).toBeDisabled();
    expect(inputCount).toHaveValue(99);
    spyState.mockRestore();
  });
});
