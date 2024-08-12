import { ShopFilterRow } from './shop-filter-row';
import { StyledShopFilter } from './styles';

export function ShoppingFilter() {
    return (
        <StyledShopFilter>
            <h2>Nossos cafés</h2>
            <nav>
                <ul>
                    <ShopFilterRow active text="Tradicional" />
                    <ShopFilterRow text="especial" />
                    <ShopFilterRow text="com leite" />
                    <ShopFilterRow text="alcoólico" />
                    <ShopFilterRow text="gelado" />
                </ul>
            </nav>
        </StyledShopFilter>
    );
}
