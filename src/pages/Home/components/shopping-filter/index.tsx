import { ShopFilterRowButton } from "./shop-filter-row";
import { StyledShopFilter } from "./styles";

interface ShoppingFilterProps {
  handleSetQueryFilter: (filter: string) => void;
  query: string;
}

export function ShoppingFilter({
  handleSetQueryFilter,
  query,
}: ShoppingFilterProps) {
  return (
    <StyledShopFilter>
      <h2>Nossos cafés</h2>
      <div>
        <ShopFilterRowButton
          {...(query === "" && { active: true })}
          onClick={() => handleSetQueryFilter("")}
        >
          Todos
        </ShopFilterRowButton>
        <ShopFilterRowButton
          {...(query === "tradicional" && { active: true })}
          onClick={() => handleSetQueryFilter("tradicional")}
        >
          Tradicional
        </ShopFilterRowButton>
        <ShopFilterRowButton
          {...(query === "especial" && { active: true })}
          onClick={() => handleSetQueryFilter("especial")}
        >
          Especial
        </ShopFilterRowButton>
        <ShopFilterRowButton
          {...(query === "com-leite" && { active: true })}
          onClick={() => handleSetQueryFilter("com-leite")}
        >
          Com Leite
        </ShopFilterRowButton>
        <ShopFilterRowButton
          {...(query === "alcoolico" && { active: true })}
          onClick={() => handleSetQueryFilter("alcoolico")}
        >
          Alcoólico
        </ShopFilterRowButton>
        <ShopFilterRowButton
          {...(query === "gelado" && { active: true })}
          onClick={() => handleSetQueryFilter("gelado")}
        >
          Gelado
        </ShopFilterRowButton>
      </div>
    </StyledShopFilter>
  );
}
