/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

jest.mock('@/env', () => ({
    env: {
        VITE_API_URL: 'http://localhost:3333/',
    },
}));

afterEach(() => {
    jest.clearAllMocks();
});
