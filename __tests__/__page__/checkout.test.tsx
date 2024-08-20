import { Checkout } from '../../src/pages/Checkout/index';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Home', () => {
    test('Rendering Component', () => {
        render(<Checkout />);
    });
});
