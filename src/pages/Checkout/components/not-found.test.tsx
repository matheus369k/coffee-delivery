import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { Package } from "@phosphor-icons/react";
import { NotFound } from "./not-found";

jest.mock("@phosphor-icons/react", () => {
  return {
    Package: jest.fn(),
  };
});

describe("NotFound", () => {
  test("renders correctly", () => {
    render(<NotFound />);
    screen.getByText(/Adicione produtos ao carrinho!/i);
    expect(Package).toHaveBeenCalledWith(
      {
        size: 220,
        weight: "light",
      },
      {}
    );
  });
});
