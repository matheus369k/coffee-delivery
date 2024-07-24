import React, { createContext, useState } from 'react';

interface CountProductsType {
    id: number;
    count: number;
}

interface CountProductsContextType {
    countProducts?: CountProductsType[];
    setCountProductsContext?: ({ id, count }: CountProductsType) => void;
}

export const CountProductsContext = createContext<CountProductsContextType>({
    countProducts: undefined,
    setCountProductsContext: undefined,
});

export function ContextProviderCountProducts({ children }: { children: React.ReactNode }) {
    const [countProducts, setCountProducts] = useState<CountProductsType[]>([]);

    function setCountProductsContext({ id, count }: CountProductsType) {
        if (!countProducts) {
            return;
        }

        if (!countProducts.find((countProduct) => countProduct.id === id)) {
            setCountProducts((state) => {
                return [
                    ...state,
                    {
                        id: id,
                        count: count,
                    },
                ];
            });

            return;
        }

        const newCountProducts = countProducts.filter((countProduct) => {
            if (countProduct.id === id) {
                countProduct.count += count;
            }

            return countProduct;
        });

        setCountProducts(newCountProducts);
    }
    return <CountProductsContext.Provider value={{ countProducts, setCountProductsContext }}>{children}</CountProductsContext.Provider>;
}
