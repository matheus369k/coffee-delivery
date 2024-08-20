import { render } from '@testing-library/react';
import { Confirm } from '../../src/pages/Confirm';
import '@testing-library/jest-dom';

describe('Home', () => {
    test('Rendering Component', () => {
        render(<Confirm />);
    });
});
