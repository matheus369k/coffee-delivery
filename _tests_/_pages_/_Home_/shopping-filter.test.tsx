import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { ShoppingFilter } from '@pages/Home/components/shopping-filter';
import { ShopFilterRow } from '@pages/Home/components/shopping-filter/shop-filter-row';

jest.mock('@pages/Home/components/shopping-filter/shop-filter-row', () => ({
  ShopFilterRow: jest.fn(),
}));

describe('ShoppingFilter', () => {
  test('should render correctly', () => {
    const handleSetQueryFilter = jest.fn();

    render(<ShoppingFilter handleSetQueryFilter={handleSetQueryFilter} query="" />);

    const shoppingFilter = screen.getByText('Nossos cafés');
    expect(shoppingFilter).toBeInTheDocument();
    expect(ShopFilterRow).toHaveBeenCalledTimes(6);
  });

  test('should ShopFilterRow with corrected props', () => {
    const handleSetQueryFilter = jest.fn();

    render(<ShoppingFilter handleSetQueryFilter={handleSetQueryFilter} query="" />);

    expect(ShopFilterRow).toHaveBeenNthCalledWith(
      1,
      {
        active: true,
        onClick: expect.any(Function),
        text: 'Todos',
      },
      {},
    );
  });

  test('should render ShopFilterRow with active true when query is equal to "tradicional"', () => {
    const handleSetQueryFilter = jest.fn();

    render(<ShoppingFilter handleSetQueryFilter={handleSetQueryFilter} query="tradicional" />);

    expect(ShopFilterRow).toHaveBeenNthCalledWith(
      2,
      {
        active: true,
        onClick: expect.any(Function),
        text: 'Tradicional',
      },
      {},
    );
    expect(ShopFilterRow).toHaveBeenNthCalledWith(
      3,
      {
        onClick: expect.any(Function),
        text: 'Especial',
      },
      {},
    );
  });
});
