/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ContextProviderCountProducts,
  CountProductsContext,
  CountProductsType,
} from '@contexts/context-count-products';
import { render } from '@testing-library/react';
import React, { useContext } from 'react';

type ActionType = { actionType: 'create' | 'update' | 'delete' | 'replace' | 'get' };

const mockSetCount = jest.fn();

const spyState = jest.spyOn(React, 'useState');

const countProducts: CountProductsType[] = [
  {
    id: '1',
    count: 4,
  },
  {
    id: '2',
    count: 2,
  },
];

const Component = ({ actionType }: ActionType) => {
  const {
    setCountProductsContext,
    removeCountsProductsContext,
    updateCountProductsContext,
    countProducts,
  } = useContext(CountProductsContext);

  if (actionType === 'create') {
        setCountProductsContext!({
          id: '3',
          count: 1,
        });
  }

  if (actionType === 'update') {
        setCountProductsContext!({
          id: '2',
          count: 4,
        });
  }

  if (actionType === 'delete') {
        removeCountsProductsContext!();
  }

  if (actionType === 'replace') {
        updateCountProductsContext!([
          { id: '1', count: 8 },
          { id: '2', count: 1 },
        ]);
  }

  if (actionType === 'get') {
    mockSetCount(countProducts);
  }

  return <h1>Test {actionType} context</h1>;
};

describe('Context count', () => {
  test('Set new count in the context', () => {
    mockSetCount.mockImplementationOnce(
      (handleState: (state: CountProductsType[]) => CountProductsType[]) => {
        return handleState(countProducts);
      },
    );

    spyState.mockImplementationOnce(() => [[], mockSetCount]);

    render(
      <ContextProviderCountProducts>
        <Component actionType="create" />
      </ContextProviderCountProducts>,
    );

    expect(mockSetCount.mock.results[0].value).toEqual([
      { id: '1', count: 4 },
      { id: '2', count: 2 },
      { id: '3', count: 1 },
    ]);
  });

  test('Set count existed in the context', () => {
    spyState.mockImplementationOnce(() => [countProducts, mockSetCount]);

    render(
      <ContextProviderCountProducts>
        <Component actionType="update" />
      </ContextProviderCountProducts>,
    );

    expect(mockSetCount.mock.lastCall).toContainEqual([
      { id: '1', count: 4 },
      { id: '2', count: 6 },
    ]);
  });

  test('remove all count in the context', () => {
    spyState.mockImplementationOnce(() => [[], mockSetCount]);

    render(
      <ContextProviderCountProducts>
        <Component actionType="delete" />
      </ContextProviderCountProducts>,
    );

    expect(mockSetCount.mock.lastCall).toContainEqual([]);
  });

  test('Replace old count for new in the context', () => {
    spyState.mockImplementationOnce(() => [countProducts, mockSetCount]);

    render(
      <ContextProviderCountProducts>
        <Component actionType="replace" />
      </ContextProviderCountProducts>,
    );

    expect(mockSetCount.mock.lastCall).toContainEqual([
      { id: '1', count: 8 },
      { id: '2', count: 1 },
    ]);
  });

  test('get correct datas from context', () => {
    spyState.mockImplementationOnce(() => [countProducts, mockSetCount]);

    render(
      <ContextProviderCountProducts>
        <Component actionType="get" />
      </ContextProviderCountProducts>,
    );

    expect(mockSetCount.mock.lastCall).toContainEqual(countProducts);
  });
});
