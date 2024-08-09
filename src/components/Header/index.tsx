import { ArrowLeft, MapPin, ShoppingCart } from '@phosphor-icons/react';
import logoCoffeeDelivery from '@assets/logo.svg';
import { StyledHeader } from './styles';
import { useContext } from 'react';
import { CountProductsContext } from '@/contexts/context-count-products';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();
    const { countProducts } = useContext(CountProductsContext);

    function handleRedirectToCheckoutPage() {
        navigate('/coffee-delivery/checkout');
    }
    function handleBackToHomePage() {
        navigate('/coffee-delivery');
    }
    const pathName = window.location.pathname;
    const isNotHomePage = !(pathName.includes('/checkout') || pathName.includes('/confirm'));

    return (
        <StyledHeader>
            <img src={logoCoffeeDelivery} loading="lazy" />

            <div>
                <button
                    onClick={handleBackToHomePage}
                    hidden={isNotHomePage}
                    type="button"
                    title="Voltar"
                >
                    <ArrowLeft size={32} weight="light" />
                </button>

                <p>
                    <MapPin size={22} weight="fill" />
                    <span>São Paulo, SP</span>
                </p>
                <button
                    disabled={!countProducts || countProducts.length === 0}
                    onClick={handleRedirectToCheckoutPage}
                    data-count-products={countProducts ? countProducts.length : 0}
                    type="button"
                >
                    <ShoppingCart size={22} weight="fill" />
                </button>
            </div>
        </StyledHeader>
    );
}
