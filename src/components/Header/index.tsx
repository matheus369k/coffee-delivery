import { ArrowLeft, MapPin, ShoppingCart } from "@phosphor-icons/react";
import logoCoffeeDelivery from "@assets/logo.svg";
import { StyledHeader } from "./styles";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { CartCoffeeContext } from "@contexts/cart-coffee-context";

export interface UserLocationType {
  city: string;
  uf: string;
}

export function Header() {
  const navigate = useNavigate();
  const { cartCoffee } = useContext(CartCoffeeContext);
  const [location, setLocation] = useState("Cidade, UF");

  function handleRedirectToCheckoutPage() {
    navigate("/coffee-delivery/checkout");
  }
  function handleBackToHomePage() {
    navigate("/coffee-delivery");
  }

  const pathName = window.location.pathname;
  const isNotHomePage = !(
    pathName.includes("/checkout") || pathName.includes("/confirm")
  );

  useEffect(() => {
    autoSetUserLocation();
  }, [pathName]);

  async function autoSetUserLocation() {
    try {
      const addressId = window.localStorage.getItem("addressId");

      if (!addressId) throw new Error("addressId not found");
      const response = await api.get(`/location/${addressId}`);
      const data = await response.data.userLocation;

      if (!data) throw new Error("data not found");
      setLocation(`${data.city}, ${data.uf}`);
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  return (
    <StyledHeader>
      <img
        onClick={handleBackToHomePage}
        src={logoCoffeeDelivery}
        loading="lazy"
        alt="A imagem e uma logo que representa uma silhueta de um copo de café escrito ao lado 'Coffee delivery'."
      />

      <div>
        <button
          onClick={handleBackToHomePage}
          hidden={isNotHomePage}
          type="button"
          title="Voltar"
          aria-label="arrow back"
        >
          <ArrowLeft size={32} weight="light" />
        </button>

        <p>
          <MapPin size={22} weight="fill" />
          <span>{location}</span>
        </p>
        <button
          onClick={handleRedirectToCheckoutPage}
          data-count-products={cartCoffee ? cartCoffee.length : 0}
          type="button"
          title="Cart"
          aria-label="Cart"
        >
          <ShoppingCart size={22} weight="fill" />
        </button>
      </div>
    </StyledHeader>
  );
}
