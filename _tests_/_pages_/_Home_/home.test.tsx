/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Home } from '@pages/Home';
import { requestCoffees } from '@pages/Home/service/get-coffees';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CoffeeCard } from '@pages/Home/components/coffee-card';
import { IntroSection } from '@pages/Home/components/intro-section';
import { LoadingCoffeeCard } from '@pages/Home/components/loading-coffee-card';
import { ShoppingFilter } from '@pages/Home/components/shopping-filter';
import { act } from 'react';

jest.mock('@pages/Home/service/get-coffees');
jest.mock('@pages/Home/components/shopping-filter', () => ({
  ShoppingFilter: jest.fn(),
}));
jest.mock('@pages/Home/components/coffee-card', () => ({
  CoffeeCard: jest.fn(),
}));
jest.mock('@pages/Home/components/loading-coffee-card', () => ({
  LoadingCoffeeCard: jest.fn(),
}));
jest.mock('@pages/Home/components/intro-section', () => ({
  IntroSection: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('Home', () => {
  const mockRequestCoffees = requestCoffees as jest.Mock;
  const defaultResponse = [
    {
      id: '1',
      name: 'Coffee 1',
      slugs: ['coffee-1'],
      tags: ['coffee', 'hot'],
      image: 'coffee-1.png',
      description: 'Coffee 1 description',
      price: '10.00',
    },
    {
      id: '2',
      name: 'Coffee 2',
      slugs: ['coffee-2'],
      tags: ['coffee', 'cold'],
      image: 'coffee-2.png',
      description: 'Coffee 2 description',
      price: '12.00',
    },
  ];

  beforeEach(() => {
    mockRequestCoffees.mockResolvedValue(defaultResponse);
  });

  afterEach(() => {
    queryClient.clear();
  });

  test('should render correctly', async () => {
    render(<Home />, { wrapper });

    expect(ShoppingFilter).toHaveBeenCalled();
    expect(IntroSection).toHaveBeenCalled();
    await waitFor(() => {
      expect(CoffeeCard).toHaveBeenCalledTimes(2);
    });
  });

  test('ShoppingFilter should be called with corrected values', () => {
    render(<Home />, { wrapper });

    expect(ShoppingFilter).toHaveBeenCalledWith(
      {
        handleSetQueryFilter: expect.any(Function),
        query: '',
      },
      {},
    );
  });

  test('should render component at the mode loading', () => {
    render(<Home />, { wrapper });

    expect(LoadingCoffeeCard).toHaveBeenCalledTimes(8);
  });

  test('should render component at the mode not found', async () => {
    mockRequestCoffees.mockResolvedValueOnce([]);

    render(<Home />, { wrapper });

    await waitFor(() => {
      expect(CoffeeCard).not.toHaveBeenCalled();
      const notFoundElement = screen.getByText('Nem um dado foi encontrado.');
      expect(notFoundElement).toBeVisible();
    });
  });

  test('should render component at the mode error', async () => {
    mockRequestCoffees.mockResolvedValueOnce(undefined);

    render(<Home />, { wrapper });

    await waitFor(() => {
      expect(CoffeeCard).not.toHaveBeenCalled();
      const errorContainer = screen.getByTitle('recarregar a pagina').parentNode;
      expect(errorContainer).toBeVisible();
    });
  });

  test('should rerender page when is clicked in button with text Recarregar', async () => {
    const mockReload = jest.fn();
    jest.spyOn(window, 'location', 'get').mockImplementationOnce(() => {
      return {
        ...Location.prototype,
        reload: jest.fn(mockReload),
      };
    });
    mockRequestCoffees.mockResolvedValueOnce(undefined);

    render(<Home />, { wrapper });

    await waitFor(() => {
      expect(CoffeeCard).not.toHaveBeenCalled();
      const buttonElement = screen.getByTitle('recarregar a pagina');
      expect(mockReload).not.toHaveBeenCalled();
      act(() => {
        fireEvent.click(buttonElement);
      });
      expect(mockReload).toHaveBeenCalled();
    });
  });
});
