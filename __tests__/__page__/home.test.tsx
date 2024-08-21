import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Home } from '../../src/pages/Home';

const MockApi = jest.fn();

jest.mock('@/lib/api', () => ({
    api: MockApi,
}));

describe('Home', () => {
    test('Rendering Component', () => {
        render(<Home />);
    });
});
