import { ArrowLeft, MapPin, ShoppingCart } from '@phosphor-icons/react';
import logoCoffeeDelivery from '@assets/logo.svg';
import { StyledHeader } from './styles';
import { useContext, useEffect, useState } from 'react';
import { CountProductsContext } from '@/contexts/context-count-products';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

export interface UserLocationType {
  city: string;
  uf: string;
}

export function Header() {
  const navigate = useNavigate();
  const { countProducts } = useContext(CountProductsContext);
  const [location, setLocation] = useState('Cidade, UF');

  function handleRedirectToCheckoutPage() {
    navigate('/coffee-delivery/checkout');
  }
  function handleBackToHomePage() {
    navigate('/coffee-delivery');
  }

  const pathName = window.location.pathname;
  const isNotHomePage = !(pathName.includes('/checkout') || pathName.includes('/confirm'));

  useEffect(() => {
    const addressId = window.localStorage.getItem('addressId');

    if (!addressId) {
      return;
    }

    api
      .get(`/location/${addressId}`)
      .then((response: { data: { userLocation: UserLocationType } }) => {
        const locationUser: UserLocationType = response.data.userLocation;

        setLocation(`${locationUser.city}, ${locationUser.uf}`);
      });
  }, [pathName]);

  return (
    <StyledHeader>
      <img
        onClick={handleBackToHomePage}
        src={logoCoffeeDelivery}
        loading="lazy"
        alt="A imagem e uma logo que representa uma silhueta de um copo de café escrito ao lado 'Coffee delivery'."
      />

      <div>
        <button onClick={handleBackToHomePage} hidden={isNotHomePage} type="button" title="Voltar">
          <ArrowLeft size={32} weight="light" />
        </button>

        <p>
          <MapPin size={22} weight="fill" />
          <span>{location}</span>
        </p>
        <button
          disabled={!countProducts || countProducts.length === 0}
          onClick={handleRedirectToCheckoutPage}
          data-count-products={countProducts ? countProducts.length : 0}
          type="button"
          title="Cart"
        >
          <ShoppingCart size={22} weight="fill" />
        </button>
      </div>
    </StyledHeader>
  );
}
