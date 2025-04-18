import { render, screen } from "@testing-library/react";
import { ShopFilterRowButton } from "./shop-filter-row";

describe("ShopFilterRowButton", () => {
  test("should render corrected", () => {
    render(<ShopFilterRowButton>test 1</ShopFilterRowButton>);
    screen.getByRole("button", { name: /test 1/i });
  });

  test("should receive all default props", () => {
    render(
      <ShopFilterRowButton title="test-2" disabled>
        test 2
      </ShopFilterRowButton>
    );
    const button = screen.getByRole("button", { name: /test 2/i });
    expect(button).toHaveAttribute("title", "test-2");
    expect(button).toBeDisabled();
  });

  test("should render button with active prop", () => {
    render(<ShopFilterRowButton active>test 1</ShopFilterRowButton>);
    const button = screen.getByRole("button", { name: /test 1/i });
    expect(button).toHaveAttribute("id", "active");
  });

  test("should render button without active prop", () => {
    render(<ShopFilterRowButton>test 1</ShopFilterRowButton>);
    const button = screen.getByRole("button", { name: /test 1/i });
    expect(button).not.toHaveAttribute("id", "active");
  });
});
