import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Confirm } from '../../src/pages/Confirm';

describe('Home', () => {
    test('Rendering Component', () => {
        render(<Confirm />);
    });
});
