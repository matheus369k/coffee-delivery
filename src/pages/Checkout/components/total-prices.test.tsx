import { render, screen } from "@testing-library/react";
import { PricesTotal } from "./total-prices";

describe("PricesTotal", () => {
  const defaultPriceTotal = {
    priceEnd: "13.00",
    Products: "10.00",
    taxa: "3.00",
  };
  
  test("renders correctly", () => {
    render(<PricesTotal isLoading={false} priceTotal={defaultPriceTotal} />);
    screen.getByText(/total de itens/i);
    screen.getByText(/R\$ 10.00/i);
    screen.getByText(/entrega/i);
    screen.getByText(/R\$ 3.00/i);
    screen.getByText(/total final/i);
    screen.getByText(/R\$ 13.00/i);
    screen.getByRole("button", { name: /confirmar pedido/i });
  });

  test("should render loading when isLoading is true", () => {
    render(<PricesTotal isLoading={true} priceTotal={defaultPriceTotal} />);
    screen.getByRole("button", { name: /carregando.../i });
  });
});
