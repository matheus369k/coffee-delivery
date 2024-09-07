import { render, screen } from '@testing-library/react';
import { PricesTotal } from '../../../../src/pages/Checkout/components/total-prices';
import { TotalPriceType } from '../../../../src/pages/Checkout';

const totalPriceType: TotalPriceType = {
    priceEnd: '13.40',
    Products: '9.90',
    taxa: '3.50',
};

describe('Total price component', () => {
    test('Should correct datas', () => {
        render(<PricesTotal isLoading={false} priceTotal={totalPriceType} />);

        expect(screen.getByText('R$ 13.40')).toBeInTheDocument();
        expect(screen.getByText('R$ 9.90')).toBeInTheDocument();
        expect(screen.getByText('R$ 3.50')).toBeInTheDocument();

        expect(screen.getByText('confirmar pedido')).toBeInTheDocument();
    });

    test('add status loading to button', () => {
        render(<PricesTotal isLoading={true} priceTotal={totalPriceType} />);

        expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });
});
