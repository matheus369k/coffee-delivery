import { render } from '@testing-library/react';
import { Home } from '../../src/pages/Home/index';
import '@testing-library/jest-dom';

describe('Home', () => {
    test('Rendering Component', () => {
        render(<Home />);
    });
});
