import { env } from '@/env';
import { api } from '@lib/api';
import { requestCoffees } from '@pages/Home/service/get-coffees';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';

describe('getCoffees', () => {
  const spyApiGet = jest.spyOn(api, 'get');
  const spyAxiosGet = jest.spyOn(axios, 'get');

  const defaultResponse = {
    coffees: [
      {
        id: '1',
        name: 'Coffee 1',
        slugs: ['coffee-1'],
        tags: ['coffee', 'hot'],
        image: 'coffee-1.png',
        description: 'Coffee 1 description',
        price: '10.00',
      },
      {
        id: '2',
        name: 'Coffee 2',
        slugs: ['coffee-2'],
        tags: ['coffee', 'cold'],
        image: 'coffee-2.png',
        description: 'Coffee 2 description',
        price: '12.00',
      },
    ],
  };

  beforeEach(() => {
    spyApiGet.mockResolvedValue({ data: defaultResponse });
    spyAxiosGet.mockResolvedValue({ data: defaultResponse.coffees });
  });

  test('should call corrected function', () => {
    const { result } = renderHook(async () => await requestCoffees(''));

    expect(result.current).resolves.toMatchObject(defaultResponse.coffees);
  });

  test('should interrupted other request when one is finished', () => {
    renderHook(async () => await requestCoffees(''));

    expect(spyApiGet).not.toHaveBeenCalled();
    expect(spyAxiosGet).toHaveBeenCalled();
  });

  test('should call request with correct path', () => {
    const { rerender } = renderHook(async ({ query }) => await requestCoffees(query), {
      initialProps: { query: '' },
    });
    expect(spyAxiosGet).toHaveBeenCalledWith(env.VITE_GH_API_URL);

    rerender({ query: 'coffee-1' });
    expect(spyApiGet).toHaveBeenCalledWith('/coffees/coffee-1');
  });

  test('should return empty array when any data is found', async () => {
    spyApiGet.mockResolvedValue({ data: [] });
    const spyConsole = jest.spyOn(console, 'log');

    const { result } = renderHook(async () => await requestCoffees('coffee-1'));

    expect(result.current).resolves.toMatchObject([]);
    await waitFor(() => expect(spyConsole).toHaveBeenCalledWith('not-found datas'));
  });
});
