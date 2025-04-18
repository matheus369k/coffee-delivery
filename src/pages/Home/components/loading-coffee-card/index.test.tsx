import { render, screen } from '@testing-library/react';
import { LoadingCoffeeCard } from './index';

describe('LoadingCoffeeCard', () => {
  test('should render loading coffee card with all elements', () => {
    render(<LoadingCoffeeCard />);

    const imageElement = screen.getByRole('listitem').firstChild;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('class', 'image');
    const tagElement = screen.getByText('Tradicional');
    expect(tagElement).toBeInTheDocument();
    const titleElement = screen.getByRole('heading', { level: 3 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Expresso Tradicional');
    const descriptionElement = screen.getByText(
      'O tradicional café feito com água quente e grãos moídos',
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  test('should render form elements correctly', () => {
    render(<LoadingCoffeeCard />);

    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveValue(1);
    expect(numberInput).toHaveAttribute('name', 'count');
    const submitButton = screen.getByRole('button', { name: 'add to cart' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});
