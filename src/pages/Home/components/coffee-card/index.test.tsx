import { render, screen } from "@testing-library/react";
import { CoffeeCard } from "./index";
import { CartCoffeeContext } from "@contexts/cart-coffee-context";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartCoffeeContext.Provider
      value={{
        AddCoffeeToCart: jest.fn(),
        cartCoffee: [],
        RemoveCoffeeToCart: jest.fn(),
        ResetCoffeeCart: jest.fn(),
      }}
    >
      {children}
    </CartCoffeeContext.Provider>
  );
};

describe("CoffeeCard", () => {
  const defaultProps = {
    id: "1",
    name: "Test Coffee",
    tags: ["hot", "special"],
    image: "test-coffee.png",
    description: "A test coffee description",
    price: "9.99",
  };

  test("should render correctly", () => {
    render(<CoffeeCard coffeeData={defaultProps} />, { wrapper });

    const imageElement = screen.getByRole("presentation");
    expect(imageElement).toHaveAttribute("src", defaultProps.image);
    screen.getByText("hot");
    screen.getByText("special");
    screen.getByRole("heading", { level: 3, name: defaultProps.name });
    screen.getByText(defaultProps.description);
    screen.getByText(defaultProps.price);
    screen.getByRole("button", { name: /Add to cart/i });
    screen.getByRole("button", { name: /less/i });
    screen.getByRole("button", { name: /more/i });
    screen.getByRole("spinbutton", { name: /count/i });
  });
});
