import { MapPin, ShoppingCart } from '@phosphor-icons/react';
import logoCoffeeDelivery from '@assets/logo.svg';
import { StyledHeader } from './styles';
import { useContext } from 'react';
import { CountProductsContext } from '@/contexts/context-count-products';

export function Header() {
    const { countProducts } = useContext(CountProductsContext);

    return (
        <StyledHeader>
            <img src={logoCoffeeDelivery} loading="lazy" />

            <div>
                <p>
                    <MapPin size={22} weight="fill" />
                    <span>São Paulo, SP</span>
                </p>
                <button data-count-products={countProducts ? countProducts.length : 0} type="button">
                    <ShoppingCart size={22} weight="fill" />
                </button>
            </div>
        </StyledHeader>
    );
}
