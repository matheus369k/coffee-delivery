import { CountProductsContext } from '@/contexts/context-count-products';
import { Minus, Plus, ShoppingCart } from '@phosphor-icons/react';
import { FormEvent, useContext, useState } from 'react';

interface CoffeeCardProps {
    coffeeData: {
        id: number;
        name: string;
        tags: string[];
        image: string;
        description: string;
        price: string;
    };
}

export function CoffeeCard({ coffeeData }: CoffeeCardProps) {
    const { setCountProductsContext } = useContext(CountProductsContext);

    const [amountCoffee, setAmountCoffee] = useState<number>(1);

    function handleAddNewCoffeeToCart(event: FormEvent<HTMLFormElement>, id: number) {
        event.preventDefault();

        if (!amountCoffee || !setCountProductsContext) {
            return;
        }

        setCountProductsContext({
            id,
            count: amountCoffee,
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

    return (
        <li>
            <img src={coffeeData.image} alt="" />
            <div>
                {coffeeData.tags.map((tag) => {
                    return <span key={tag}>{tag}</span>;
                })}
            </div>
            <h3>{coffeeData.name}</h3>
            <p>{coffeeData.description}</p>
            <div>
                <span>{coffeeData.price}</span>
                <form onSubmit={(event) => handleAddNewCoffeeToCart(event, coffeeData.id)}>
                    <div>
                        <button disabled={amountCoffee === 1} onClick={handleLessCoffeeCount} type="button">
                            <Minus size={16} weight="bold" />
                        </button>
                        <input onChange={(event) => setAmountCoffee(Number(event.target.value))} type="number" value={amountCoffee} name="count" />
                        <button disabled={amountCoffee === 99} onClick={handleAmountCoffeeCount} type="button">
                            <Plus size={16} weight="bold" />
                        </button>
                    </div>
                    <button type="submit">
                        <ShoppingCart size={22} weight="fill" />
                    </button>
                </form>
            </div>
        </li>
    );
}
