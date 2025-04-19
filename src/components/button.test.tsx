import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  test("should render with passed props", () => {
    render(<Button className="test-class" aria-label="test button" />);
    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toHaveClass("test-class");
  });

  test("should have type button by default", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  test("should handle click events", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("should be disabled when disabled prop is passed", () => {
    render(<Button disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
