import { CountProductsContext } from '@/contexts/context-count-products';
import { Minus, Plus, Trash } from '@phosphor-icons/react';
import { useContext, useState } from 'react';
import { Button } from '../../components/button';

interface BuyCoffeeDatasType {
    id: string;
    name: string;
    image: string;
    total_price: string;
    count: number;
}

export function CardBuyCoffee({ id, name, image, total_price, count }: BuyCoffeeDatasType) {
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

    function handleRemoveCoffee(id: string) {
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
                <div>
                    <div>
                        <Button
                            disabled={lessCoffee === 1}
                            onClick={handleLessRemoveCoffeeCount}
                            title="Less"
                        >
                            <Minus size={16} weight="bold" />
                        </Button>
                        <input
                            onChange={(event) => setLessCoffee(Number(event.target.value))}
                            type="number"
                            value={lessCoffee}
                            name="count"
                        />
                        <Button
                            disabled={lessCoffee === 99 || lessCoffee === count}
                            onClick={handleAmountRemoveCoffeeCount}
                            title="Amount"
                        >
                            <Plus size={16} weight="bold" />
                        </Button>
                    </div>
                    <Button onClick={() => handleRemoveCoffee(id)} title="Remove">
                        <Trash size={16} />
                        <span>Remover</span>
                    </Button>
                </div>
            </div>
            <span>{total_price}</span>
        </li>
    );
}
