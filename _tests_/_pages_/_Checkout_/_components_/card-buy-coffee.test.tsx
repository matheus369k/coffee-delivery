import { fireEvent, render, screen } from '@testing-library/react';
import { CardBuyCoffee } from '../../../../src/pages/Checkout/components/card-buy-coffee';
import { BuyCoffeeDatasType } from '../../../../src/pages/Checkout';
import React from 'react';
import { CountProductsType } from '../../../../src/contexts/context-count-products';

const mockSetState = jest.fn();
const updateCountProductsContext = jest.fn((createNewCountProducts: CountProductsType) => {
    return createNewCountProducts;
});

const spyUseState = jest.spyOn(React, 'useState');
const spyContext = jest.spyOn(React, 'useContext');

const data: BuyCoffeeDatasType = {
    id: '1',
    name: 'Expresso Americano',
    image: 'https://localhost:3000/image.png',
    total_price: '9,90',
    count: 2,
};

describe('Card of the cart', () => {
    test('should the cards', () => {
        render(<CardBuyCoffee {...data} key={data.id} />);

        const altImage = `Image representando a aparência do café ${data.name}`;

        expect(screen.getByText(data.name)).toBeInTheDocument();
        expect(screen.getByText(data.total_price)).toBeInTheDocument();
        expect(screen.getByAltText(altImage)).toHaveAttribute('src', data.image);
    });

    test('disabled less button', () => {
        render(<CardBuyCoffee {...data} key={data.id} />);

        expect(screen.getByTitle('Less')).toHaveAttribute('disabled');
    });

    test('disabled amount button', () => {
        spyUseState.mockImplementationOnce(() => [99, mockSetState]);

        render(<CardBuyCoffee {...data} key={data.id} />);

        expect(screen.getByTitle('Amount')).toHaveAttribute('disabled');
    });

    test('Clicking Amount button', () => {
        mockSetState.mockImplementationOnce((dispatch: (state: number) => number) => {
            return dispatch(1);
        });

        spyUseState.mockImplementationOnce(() => [1, mockSetState]);

        render(<CardBuyCoffee {...data} key={data.id} />);

        fireEvent.click(screen.getByTitle('Amount'));

        expect(mockSetState.mock.results[0].value).toEqual(2);
    });

    test('Clicking Less button', () => {
        mockSetState.mockImplementationOnce((dispatch: (state: number) => number) => {
            return dispatch(3);
        });

        spyUseState.mockImplementationOnce(() => [3, mockSetState]);

        render(<CardBuyCoffee {...data} key={data.id} />);

        fireEvent.click(screen.getByTitle('Less'));

        expect(mockSetState.mock.results[0].value).toEqual(2);
    });

    test('remove one product from cart', () => {
        const countProducts = [
            {
                id: '1',
                count: 4,
            },
            {
                id: '2',
                count: 2,
            },
        ];
        spyUseState.mockImplementationOnce(() => [1, mockSetState]);
        spyContext.mockImplementationOnce(() => {
            return {
                countProducts,
                updateCountProductsContext,
            };
        });

        render(<CardBuyCoffee {...data} key={data.id} />);

        fireEvent.click(screen.getByTitle('Remove'));

        expect(mockSetState.mock.lastCall).toEqual([1]);
        expect(updateCountProductsContext.mock.results[0].value).toEqual([
            { id: '1', count: 3 },
            { id: '2', count: 2 },
        ]);
    });

    test('remove many products from cart', () => {
        const countProducts = [
            {
                id: '1',
                count: 4,
            },
            {
                id: '2',
                count: 2,
            },
        ];

        spyUseState.mockImplementationOnce(() => [3, mockSetState]);
        spyContext.mockImplementationOnce(() => {
            return {
                countProducts,
                updateCountProductsContext,
            };
        });

        render(<CardBuyCoffee {...data} key={data.id} />);

        fireEvent.click(screen.getByTitle('Remove'));

        expect(mockSetState.mock.lastCall).toEqual([1]);
        expect(updateCountProductsContext.mock.results[0].value).toEqual([
            { id: '1', count: 1 },
            { id: '2', count: 2 },
        ]);
    });
});
