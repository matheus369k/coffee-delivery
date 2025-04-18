import { Minus, Plus, Trash } from "@phosphor-icons/react";
import { useContext, useState, type ChangeEvent } from "react";
import { Button } from "@components/button";
import { CartCoffeeContext } from "@contexts/cart-coffee-context";

export interface BuyCoffeeDatasType {
  id: string;
  name: string;
  image: string;
  total_price: string;
  count: number;
}

export function CardBuyCoffee({
  id,
  name,
  image,
  total_price,
  count,
}: BuyCoffeeDatasType) {
  const { RemoveCoffeeToCart } = useContext(CartCoffeeContext);
  const [lessCoffee, setLessCoffee] = useState(1);

  function handleAmountRemoveCoffeeCount() {
    setLessCoffee((state) => {
      return state + 1;
    });
  }

  function handleLessRemoveCoffeeCount() {
    setLessCoffee((state) => {
      return state - 1;
    });
  }

  function handleChangeLessCoffeeCount(event: ChangeEvent<HTMLInputElement>) {
    setLessCoffee(Number(event.currentTarget.value));
  }

  function handleRemoveCoffee() {
    Array.from({ length: lessCoffee }).forEach(() => {
      RemoveCoffeeToCart({
        id,
        price: (parseFloat(total_price) / count).toFixed(2),
      });
    });
    setLessCoffee(1);
  }

  return (
    <li>
      <img
        src={image}
        alt={`Image representando a aparência do café ${name}`}
      />
      <div>
        <h4>{name}</h4>
        <div>
          <div>
            <Button
              aria-label="less"
              disabled={lessCoffee === 1}
              onClick={handleLessRemoveCoffeeCount}
              title="Less"
            >
              <Minus size={16} weight="bold" />
            </Button>
            <input
              aria-label="count"
              onChange={handleChangeLessCoffeeCount}
              type="number"
              value={lessCoffee}
              name="count"
            />
            <Button
              aria-label="amount"
              disabled={lessCoffee === 99 || lessCoffee === count}
              onClick={handleAmountRemoveCoffeeCount}
              title="Amount"
            >
              <Plus size={16} weight="bold" />
            </Button>
          </div>
          <Button
            aria-label="remove"
            onClick={handleRemoveCoffee}
            title="Remover"
          >
            <Trash size={16} />
            <span>Remover</span>
          </Button>
        </div>
      </div>
      <span>{total_price}</span>
    </li>
  );
}
