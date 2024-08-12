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
                        {...(query === 'Tradicional' && { active: true })}
                        onClick={() => handleSetQueryFilter('Tradicional')}
                        text="Tradicional"
                    />
                    <ShopFilterRow
                        {...(query === 'Especial' && { active: true })}
                        onClick={() => handleSetQueryFilter('Especial')}
                        text="Especial"
                    />
                    <ShopFilterRow
                        {...(query === 'Com Leite' && { active: true })}
                        onClick={() => handleSetQueryFilter('Com Leite')}
                        text="Com Leite"
                    />
                    <ShopFilterRow
                        {...(query === 'Alcoólico' && { active: true })}
                        onClick={() => handleSetQueryFilter('Alcoólico')}
                        text="Alcoólico"
                    />
                    <ShopFilterRow
                        {...(query === 'Gelado' && { active: true })}
                        onClick={() => handleSetQueryFilter('Gelado')}
                        text="Gelado"
                    />
                </ul>
            </nav>
        </StyledShopFilter>
    );
}
