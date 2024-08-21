import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkout } from '../../src/pages/Checkout';

describe('Home', () => {
    test('Rendering Component', () => {
        render(<Checkout />);
    });
});
