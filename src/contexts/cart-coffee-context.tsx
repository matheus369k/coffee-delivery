import { createContext, useState } from "react";

export interface CartCoffeeType {
  id: string;
  name: string;
  image: string;
  total_price: string;
  count: number;
}

export interface PayloadType {
  id: string;
  name: string;
  image: string;
  price: string;
}

export interface CartCoffeeContextType {
  cartCoffee: CartCoffeeType[];
  RemoveCoffeeToCart: (props: Omit<PayloadType, "name" | "image">) => void;
  AddCoffeeToCart: (props: PayloadType) => void;
  ResetCoffeeCart: () => void;
}

export const CartCoffeeContext = createContext({} as CartCoffeeContextType);

export function CartCoffeeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCoffee, setCartCoffee] = useState<CartCoffeeType[]>([]);

  function calculateTotalPrice(props: { count: number; price: number }) {
    return (props.count * props.price).toFixed(2);
  }

  function hasDuplicatedCoffee(props: {
    coffees: CartCoffeeType[];
    id: string;
  }) {
    return props.coffees.some((coffee) => {
      return coffee.id === props.id;
    });
  }

  function formattedPriceToValidateNumber(price: string) {
    return parseFloat(price.replace(",", "."));
  }

  function restoreDefaultformatterPrice(price: string) {
    return price.replace(".", ",");
  }

  function AddCoffeeToCart(props: PayloadType) {
    const { id, name, image, price } = props;
    setCartCoffee((state) => {
      if (hasDuplicatedCoffee({ coffees: state, id })) {
        const newStateWithMoreCoffee = state.map((coffee) => {
          if (coffee.id === id) {
            const countCoffee = coffee.count + 1;
            const totalPrice = calculateTotalPrice({
              count: countCoffee,
              price: formattedPriceToValidateNumber(price),
            });
            return {
              ...coffee,
              total_price: restoreDefaultformatterPrice(totalPrice),
              count: countCoffee,
            };
          }
          return {
            ...coffee,
            total_price: restoreDefaultformatterPrice(coffee.total_price),
          };
        });
        return newStateWithMoreCoffee;
      }
      return [
        ...state,
        {
          id,
          name,
          image,
          total_price: restoreDefaultformatterPrice(price),
          count: 1,
        },
      ];
    });
  }

  function RemoveCoffeeToCart(props: Omit<PayloadType, "name" | "image">) {
    const { id, price } = props;
    setCartCoffee((state) => {
      const newStateWithLessCoffee = state
        .map((coffee) => {
          if (coffee.id === id) {
            const countCoffee = coffee.count - 1;
            const totalPrice = calculateTotalPrice({
              count: countCoffee,
              price: formattedPriceToValidateNumber(price),
            });
            return {
              ...coffee,
              total_price: restoreDefaultformatterPrice(totalPrice),
              count: countCoffee,
            };
          }
          return {
            ...coffee,
            total_price: restoreDefaultformatterPrice(coffee.total_price),
          };
        })
        .filter((coffee) => coffee.count > 0);
      return newStateWithLessCoffee;
    });
  }

  function ResetCoffeeCart() {
    setCartCoffee([]);
  }

  return (
    <CartCoffeeContext.Provider
      value={{
        cartCoffee,
        RemoveCoffeeToCart,
        AddCoffeeToCart,
        ResetCoffeeCart,
      }}
    >
      {children}
    </CartCoffeeContext.Provider>
  );
}
