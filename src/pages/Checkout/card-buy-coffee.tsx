import { CountProductsContext } from '@/contexts/context-count-products';
import { Minus, Plus, Trash } from '@phosphor-icons/react';
import { useContext, useState } from 'react';

interface BuyCoffeeDatasType {
    id: number;
    name: string;
    image: string;
    totalPrice: string;
    count: number;
}

export function CardBuyCoffee({ id, name, image, totalPrice, count }: BuyCoffeeDatasType) {
    const { countProducts, updateCountProductsContext } = useContext(CountProductsContext);

    const [lessCoffee, setLessCoffee] = useState<number>(1);

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

    function handleRemoveCoffee(id: number) {
        if (!updateCountProductsContext || !countProducts) {
            return;
        }

        const createNewCountProducts = countProducts.filter((countProduct) => {
            if (countProduct.id === id) {
                countProduct.count -= lessCoffee;
            }

            if (countProduct.count > 0) {
                return countProduct;
            }
        });

        updateCountProductsContext(createNewCountProducts);
        setLessCoffee(1);
    }

    return (
        <li>
            <img src={image} alt="" />
            <div>
                <h4>{name}</h4>
                <form>
                    <div>
                        <button disabled={lessCoffee === 1} onClick={handleLessRemoveCoffeeCount} type="button">
                            <Minus size={16} weight="bold" />
                        </button>
                        <input onChange={(event) => setLessCoffee(Number(event.target.value))} type="number" value={lessCoffee} name="count" />
                        <button disabled={lessCoffee === 99 || lessCoffee === count} onClick={handleAmountRemoveCoffeeCount} type="button">
                            <Plus size={16} weight="bold" />
                        </button>
                    </div>
                    <button onClick={() => handleRemoveCoffee(id)} type="button">
                        <Trash size={16} />
                        <span>Remover</span>
                    </button>
                </form>
            </div>
            <span>{totalPrice}</span>
        </li>
    );
}
