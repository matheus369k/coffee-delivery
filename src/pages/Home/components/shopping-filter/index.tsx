import { ShopFilterRow } from './shop-filter-row';
import { StyledShopFilter } from './styles';

interface ShoppingFilterProps {
  handleSetQueryFilter: (filter: string) => void;
  query: string;
}

export function ShoppingFilter({ handleSetQueryFilter, query }: ShoppingFilterProps) {
  return (
    <StyledShopFilter>
      <h2>Nossos cafés</h2>
      <nav>
        <ul>
          <ShopFilterRow
            {...(query === '' && { active: true })}
            onClick={() => handleSetQueryFilter('')}
            text="Todos"
          />
          <ShopFilterRow
            {...(query === 'tradicional' && { active: true })}
            onClick={() => handleSetQueryFilter('tradicional')}
            text="Tradicional"
          />
          <ShopFilterRow
            {...(query === 'especial' && { active: true })}
            onClick={() => handleSetQueryFilter('especial')}
            text="Especial"
          />
          <ShopFilterRow
            {...(query === 'com-leite' && { active: true })}
            onClick={() => handleSetQueryFilter('com-leite')}
            text="Com Leite"
          />
          <ShopFilterRow
            {...(query === 'alcoolico' && { active: true })}
            onClick={() => handleSetQueryFilter('alcoolico')}
            text="Alcoólico"
          />
          <ShopFilterRow
            {...(query === 'gelado' && { active: true })}
            onClick={() => handleSetQueryFilter('gelado')}
            text="Gelado"
          />
        </ul>
      </nav>
    </StyledShopFilter>
  );
}
