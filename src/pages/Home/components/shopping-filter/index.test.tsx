import { render, screen } from "@testing-library/react";
import { ShoppingFilter } from "@pages/Home/components/shopping-filter";
import userEvent from "@testing-library/user-event";

describe("ShoppingFilter", () => {
  test("should render correctly", () => {
    render(<ShoppingFilter handleSetQueryFilter={jest.fn()} query="" />);
    screen.getByText("Nossos cafés");
    screen.getByRole("button", { name: /Todos/i });
    screen.getByRole("button", { name: /Tradicional/i });
    screen.getByRole("button", { name: /Especial/i });
    screen.getByRole("button", { name: /Com Leite/i });
    screen.getByRole("button", { name: /Alcoólico/i });
    screen.getByRole("button", { name: /Gelado/i });
  });

  test('should render ShopFilterRow with id active when query is equal to "tradicional"', () => {
    render(
      <ShoppingFilter handleSetQueryFilter={jest.fn()} query="tradicional" />
    );
    const filterTradicional = screen.getByRole("button", {
      name: /Tradicional/i,
    });
    const filterAlcoólico = screen.getByRole("button", {
      name: /Alcoólico/i,
    });
    expect(filterAlcoólico).not.toHaveProperty("id", "active");
    expect(filterTradicional).toHaveProperty("id", "active");
  });

  test("should called handleSetQueryFilter when click in filter", async () => {
    const user = userEvent.setup();
    const handleSetQueryFilter = jest.fn();
    render(
      <ShoppingFilter
        handleSetQueryFilter={handleSetQueryFilter}
        query="gelado"
      />
    );
    const filterGelado = screen.getByRole("button", { name: /Gelado/i });

    await user.click(filterGelado);

    expect(handleSetQueryFilter).toHaveBeenCalledWith("gelado");
  });
});
