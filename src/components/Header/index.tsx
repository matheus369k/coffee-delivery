import { MapPin, ShoppingCart } from '@phosphor-icons/react';
import logoCoffeeDelivery from '@assets/logo.svg';
import { StyledHeader } from './styles';

export function Header() {
    return (
        <StyledHeader>
            <img src={logoCoffeeDelivery} loading="lazy" />

            <div>
                <p>
                    <MapPin size={22} weight="fill" />
                    <span>São Paulo, SP</span>
                </p>
                <button data-countProducts={1} type="button">
                    <ShoppingCart size={22} weight="fill" />
                </button>
            </div>
        </StyledHeader>
    );
}
