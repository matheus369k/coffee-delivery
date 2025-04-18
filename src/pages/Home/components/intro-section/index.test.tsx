import { render, screen } from '@testing-library/react';
import { IntroSection } from './index';
import { ShoppingCart, Package, Timer, Coffee } from '@phosphor-icons/react';
import introImage from '@assets/into-Imagem.svg';

jest.mock('@phosphor-icons/react', () => ({
  ShoppingCart: jest.fn(() => null),
  Package: jest.fn(() => null),
  Timer: jest.fn(() => null),
  Coffee: jest.fn(() => null),
}));

describe('IntroSection', () => {
  test('should render heading and subheading text correctly', () => {
    render(<IntroSection />);

    const heading = screen.getByText('Encontre o café perfeito para qualquer hora do dia');
    expect(heading).toBeInTheDocument();
    const subheading = screen.getByText(
      'Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora',
    );
    expect(subheading).toBeInTheDocument();
  });

  test('should render all list items with correct text', () => {
    render(<IntroSection />);

    const cartParagraph = screen.getByText('Compra simples e segura');
    expect(cartParagraph).toBeInTheDocument();
    const boxParagraph = screen.getByText('Embalagem mantém o café intacto');
    expect(boxParagraph).toBeInTheDocument();
    const timerParagraph = screen.getByText('Entrega rápida e rastreada');
    expect(timerParagraph).toBeInTheDocument();
    const coffeeParagraph = screen.getByText('O café chega fresquinho até você');
    expect(coffeeParagraph).toBeInTheDocument();
  });

  test('should render all icons with correct IDs', () => {
    render(<IntroSection />);

    const cartParagraph = screen.getByText('Compra simples e segura');
    expect(cartParagraph.parentNode?.firstChild).toHaveAttribute('id', 'cart');
    const boxParagraph = screen.getByText('Embalagem mantém o café intacto');
    expect(boxParagraph.parentNode?.firstChild).toHaveAttribute('id', 'box');
    const timerParagraph = screen.getByText('Entrega rápida e rastreada');
    expect(timerParagraph.parentNode?.firstChild).toHaveAttribute('id', 'timer');
    const coffeeParagraph = screen.getByText('O café chega fresquinho até você');
    expect(coffeeParagraph.parentNode?.firstChild).toHaveAttribute('id', 'coffee');
  });

  test('should render image with correct alt text', () => {
    render(<IntroSection />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', introImage);
  });

  test('should render phosphor icons with correct size and weight', () => {
    render(<IntroSection />);

    expect(ShoppingCart).toHaveBeenCalledWith({ size: 16, weight: 'fill' }, {});
    expect(Package).toHaveBeenCalledWith({ size: 16, weight: 'fill' }, {});
    expect(Timer).toHaveBeenCalledWith({ size: 16, weight: 'fill' }, {});
    expect(Coffee).toHaveBeenCalledWith({ size: 16, weight: 'fill' }, {});
  });
});
