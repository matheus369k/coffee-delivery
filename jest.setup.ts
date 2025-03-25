/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

jest.mock('@/env', () => ({
  env: {
    VITE_RENDER_API_URL: 'http://localhost:3333/',
    VITE_GH_API_URL: 'https://github.com/',
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});
