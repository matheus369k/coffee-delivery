import { TotalPriceType } from "..";

export function PricesTotal({
  isLoading,
  priceTotal,
}: {
  isLoading: boolean;
  priceTotal: TotalPriceType;
}) {
  return (
    <div>
      <p>
        <span>Total de itens</span>
        <span>R$ {priceTotal.Products}</span>
      </p>
      <p>
        <span>Entrega</span>
        <span>R$ {priceTotal.taxa}</span>
      </p>
      <p>
        <span>Total Final</span>
        <span>R$ {priceTotal.priceEnd}</span>
      </p>
      <button disabled={isLoading} type="submit">
        {isLoading ? "Carregando..." : "confirmar pedido"}
      </button>
    </div>
  );
}
