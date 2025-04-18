import { fireEvent, render, screen } from "@testing-library/react";
import { ItemPaymentContent, ItemPaymentRoot } from "./item-payment";

describe("ItemPaymentRootProps", () => {
  test("renders correctly", () => {
    render(
      <ItemPaymentRoot onClick={() => jest.fn()}>
        <span>Payment Root</span>
      </ItemPaymentRoot>
    );
    screen.getByText(/Payment Root/i);
  });

  test("should call onClick when clicked", () => {
    const onClick = jest.fn();
    render(
      <ItemPaymentRoot onClick={onClick}>
        <span>Payment Root</span>
      </ItemPaymentRoot>
    );
    const button = screen.getByText(/Payment Root/i);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  test('render with default input with type="radio" and name="formPayment"', () => {
    render(
      <ItemPaymentRoot onClick={() => jest.fn()}>
        <span>Payment Root</span>
      </ItemPaymentRoot>
    );
    const inputPayment = screen.getByRole("radio");
    expect(inputPayment).toHaveAttribute("name", "formPayment");
  });
});

describe("ItemPaymentContent", () => {
  test("renders correctly", () => {
    render(<ItemPaymentContent>Payment Content</ItemPaymentContent>);
    screen.getByText(/Payment Content/i);
  });
});
