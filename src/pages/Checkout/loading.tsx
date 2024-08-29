import { Package } from '@phosphor-icons/react';
import { StyledEmptyCart } from './styles';

export function Loading() {
    return (
        <StyledEmptyCart>
            <Package size={220} weight="light" />
            <p>Adicione produtos ao carrinho!</p>
        </StyledEmptyCart>
    );
}
