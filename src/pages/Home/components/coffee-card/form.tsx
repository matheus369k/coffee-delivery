import { Button } from "@components/button";
import {
  CartCoffeeContext,
  type PayloadType,
} from "@contexts/cart-coffee-context";
import { Minus, Plus, ShoppingCart } from "@phosphor-icons/react";
import { useContext, useState } from "react";

interface CoffeeCardFormProps extends PayloadType {}

export function CoffeeCardForm({
  id,
  image,
  name,
  price,
}: CoffeeCardFormProps) {
  const { AddCoffeeToCart } = useContext(CartCoffeeContext);
  const [amountCoffee, setAmountCoffee] = useState(1);

  function handleAddNewCoffeeToCart() {
    event?.preventDefault();
    Array.from({ length: amountCoffee }).forEach(() => {
      AddCoffeeToCart({ id, image, name, price });
    });
    setAmountCoffee(1);
  }

  function handleAmountCoffeeCount() {
    setAmountCoffee((state) => {
      return state + 1;
    });
  }

  function handleLessCoffeeCount() {
    setAmountCoffee((state) => {
      return state - 1;
    });
  }

  function handleChangeAmountValue(event: React.FormEvent<HTMLInputElement>) {
    console.log(Number(event.currentTarget.value));
    setAmountCoffee(Number(event.currentTarget.value));
  }

  return (
    <form onSubmit={handleAddNewCoffeeToCart}>
      <div>
        <Button
          aria-label="less"
          disabled={amountCoffee <= 1}
          onClick={handleLessCoffeeCount}
          title="Less"
        >
          <Minus size={16} weight="bold" />
        </Button>
        <input
          aria-label="count"
          onChange={handleChangeAmountValue}
          type="number"
          max={99}
          min={1}
          value={amountCoffee}
          name="count"
        />
        <Button
          aria-label="more"
          disabled={amountCoffee >= 99}
          onClick={handleAmountCoffeeCount}
          title="more"
        >
          <Plus size={16} weight="bold" />
        </Button>
      </div>
      <button aria-label="add to cart" type="submit" title="add to cart">
        <ShoppingCart size={22} weight="fill" />
      </button>
    </form>
  );
}
