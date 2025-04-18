import { fireEvent, render, screen } from "@testing-library/react";
import { CardBuyCoffee } from "./card-buy-coffee";
import { CartCoffeeContext } from "@contexts/cart-coffee-context";

describe("CardBuyCoffee", () => {
  const defaultProps = {
    id: "1",
    name: "Expresso Tradicional",
    image: "expresso.png",
    total_price: "10.00",
    count: 1,
  };

  test("renders correctly", () => {
    render(<CardBuyCoffee {...defaultProps} />);
    screen.getByRole("img", {
      name: `Image representando a aparência do café ${defaultProps.name}`,
    });
    screen.getByRole("heading", { level: 4, name: defaultProps.name });
    screen.getByRole("button", { name: "remove" });
    screen.getByRole("button", { name: "less" });
    screen.getByRole("button", { name: "amount" });
    screen.getByRole("spinbutton", { name: "count" });
    screen.getByText(defaultProps.total_price);
  });

  test("should add count when is dispatch Change event of the input", () => {
    render(<CardBuyCoffee {...defaultProps} />);
    const input = screen.getByRole("spinbutton", { name: "count" });

    fireEvent.change(input, { target: { value: "2" } });

    expect(input).toHaveValue(2);
  });

  test("disabled button less when count state is 1", () => {
    render(<CardBuyCoffee {...defaultProps} />);
    const lessButton = screen.getByRole("button", { name: "less" });
    expect(lessButton).toBeDisabled();
  });

  test("disabled button amount when count state is 99", () => {
    const updateDefaultProps = { ...defaultProps, count: 99 };
    render(<CardBuyCoffee {...updateDefaultProps} />);
    const amountButton = screen.getByRole("button", { name: "amount" });
    const input = screen.getByRole("spinbutton", { name: "count" });

    fireEvent.change(input, { target: { value: "99" } });

    expect(amountButton).toBeDisabled();
  });

  test("disabled amount button when max count is equal to count state", () => {
    const updateDefaultProps = { ...defaultProps, count: 50 };
    render(<CardBuyCoffee {...updateDefaultProps} />);
    const amountButton = screen.getByRole("button", { name: "amount" });
    const input = screen.getByRole("spinbutton", { name: "count" });

    fireEvent.change(input, { target: { value: "50" } });

    expect(amountButton).toBeDisabled();
  });

  test("should amount one count state when is clicked in amount button", () => {
    const updateDefaultProps = { ...defaultProps, count: 2 };
    render(<CardBuyCoffee {...updateDefaultProps} />);
    const amountButton = screen.getByRole("button", { name: "amount" });
    const countInput = screen.getByRole("spinbutton", { name: "count" });

    fireEvent.click(amountButton);

    expect(countInput).toHaveValue(2);
  });

  test("should less one count state when is clicked in less button", () => {
    const updateDefaultProps = { ...defaultProps, count: 2 };
    render(<CardBuyCoffee {...updateDefaultProps} />);
    const lessButton = screen.getByRole("button", { name: "less" });
    const countInput = screen.getByRole("spinbutton", { name: "count" });
    const input = screen.getByRole("spinbutton", { name: "count" });

    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(lessButton);

    expect(countInput).toHaveValue(1);
  });

  test("should reset state and call RemoveCoffeeToCart from context  when is clicked in remove button", () => {
    const updateDefaultProps = { ...defaultProps, count: 2 };
    const mockRemoveCoffeeToCart = jest.fn();
    render(<CardBuyCoffee {...updateDefaultProps} />, {
      wrapper: ({ children }) => (
        <CartCoffeeContext.Provider
          value={{
            RemoveCoffeeToCart: mockRemoveCoffeeToCart,
            AddCoffeeToCart: jest.fn(),
            ResetCoffeeCart: jest.fn(),
            cartCoffee: [],
          }}
        >
          {children}
        </CartCoffeeContext.Provider>
      ),
    });
    const removeButton = screen.getByRole("button", { name: "remove" });
    const countInput = screen.getByRole("spinbutton", { name: "count" });

    fireEvent.change(countInput, { target: { value: "2" } });
    fireEvent.click(removeButton);

    expect(countInput).toHaveValue(1);
    expect(mockRemoveCoffeeToCart).toHaveBeenCalledWith({
      id: defaultProps.id,
      price: "5.00",
    });
  });
});
