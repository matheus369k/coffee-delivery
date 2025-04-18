import { CartCoffeeContext } from "@contexts/cart-coffee-context";
import { useContext, useEffect, useState } from "react";

export function useCalculateFinnishPrice() {
  const { cartCoffee } = useContext(CartCoffeeContext);
  const [priceTotal, setPriceTotal] = useState({
    priceEnd: "0.00",
    Products: "0.00",
    taxa: "3.50",
  });

  useEffect(() => {
    const TotalPrice = cartCoffee.reduce((acc, coffee) => {
      return acc + parseFloat(coffee.total_price) * coffee.count;
    }, 0);
    if (TotalPrice > 0) {
      setPriceTotal((state) => {
        return {
          ...state,
          priceEnd: (TotalPrice + parseFloat(state.taxa)).toFixed(2),
          Products: TotalPrice.toFixed(2),
        };
      });
    }
  }, [cartCoffee]);

  return {
    priceTotal,
  };
}
