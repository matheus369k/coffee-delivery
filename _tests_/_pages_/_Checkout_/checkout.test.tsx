/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BuyCoffeeDatasType, Checkout, FormUseType, TotalPriceType } from '@pages/Checkout';
import { fireEvent, render, screen } from '@testing-library/react';
import { GetCoffeesPropsType } from '@pages/Checkout/service/get-coffees';
import { CountProductsType } from '@contexts/context-count-products';
import { RegisterAddressPropsType } from '@pages/Checkout/service/register-address';
import { UpdateAddressPropsType } from '@pages/Checkout/service/update-address';
import { PostShoppingPropsType } from '@pages/Checkout/service/post-shopping';

const priceTotal: TotalPriceType = {
  priceEnd: '0.00',
  Products: '0.00',
  taxa: '3.50',
};

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

const dataShopping: BuyCoffeeDatasType[] = [
  {
    id: '1',
    name: 'Expresso Americano',
    image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/expresso-americano.png?raw=true',
    total_price: '39.60',
    count: 4,
  },
  {
    id: '2',
    name: 'Expresso Cremoso',
    image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/expresso-cremoso.png?raw=true',
    total_price: '19.80',
    count: 2,
  },
];

const address: FormUseType = {
  cep: '55460000',
  city: 'Recife',
  complement: '',
  neighborhood: 'Dom pedro primeiro',
  number: 45,
  street: 'Luiz inacio',
  uf: 'PE',
};

const mockNavigate = jest.fn();
const mockRemoveCountsProductsContext = jest.fn();
const mockGetCoffees = jest.fn();
const mockSetTotalPrice = jest.fn();
const mockSetPayFormat = jest.fn();
const mockSetLoading = jest.fn();
const mockRegisterAddress = jest.fn();
const mockUpdateAddress = jest.fn();
const mockPostShopping = jest.fn();

const spyState = jest.spyOn(React, 'useState');
const spyContext = jest.spyOn(React, 'useContext');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

jest.mock('@pages/Checkout/service/get-coffees', () => ({
  GetCoffees: ({ buyPriceTotal }: GetCoffeesPropsType) => {
    mockGetCoffees(buyPriceTotal);

    return {
      buyCoffeeDatas: dataShopping,
    };
  },
}));

jest.mock('@pages/Checkout/components/form/service/get-user-address', () => ({
  GetUserAddress: jest.fn(),
}));

jest.mock('@pages/Checkout/components/form/service/get-viacep', () => ({
  GetAddressViaCep: jest.fn(),
}));

jest.mock('@pages/Checkout/service/post-shopping', () => ({
  PostShopping: (props: PostShoppingPropsType) => {
    mockPostShopping({ ...props });

    return {
      then: (handleResponse: () => void) => {
        handleResponse();
      },
    };
  },
}));

jest.mock('@pages/Checkout/service/register-address', () => ({
  RegisterAddress: ({ address }: RegisterAddressPropsType) => {
    return mockRegisterAddress(address);
  },
}));

jest.mock('@pages/Checkout/service/update-address', () => ({
  UpdateAddress: (props: UpdateAddressPropsType) => {
    mockUpdateAddress({ ...props });
  },
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => {
    return {
      handleSubmit: (handleAddress: (address: FormUseType) => void) => {
        handleAddress(address);
      },
      watch: jest.fn(),
      register: jest.fn(),
      setValue: jest.fn(),
    };
  },
}));

describe('Checkout', () => {
  test('Set correct price prices on the state TotalPrice', () => {
    mockGetCoffees.mockImplementationOnce(
      (buyPriceTotal: (buyCoffeeProp: BuyCoffeeDatasType[]) => void) => {
        buyPriceTotal(dataShopping);
      },
    );

    mockSetTotalPrice.mockImplementationOnce(
      (handleTotalPrice: (state: TotalPriceType) => TotalPriceType) => {
        return handleTotalPrice(priceTotal);
      },
    );

    spyState
      .mockImplementationOnce(() => ['', jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [priceTotal, mockSetTotalPrice]);

    render(<Checkout />);

    expect(mockSetTotalPrice.mock.results[0].value).toEqual({
      priceEnd: '62.90',
      Products: '59.40',
      taxa: '3.50',
    });
  });

  test('Get format payment', () => {
    spyState.mockImplementationOnce(() => ['', mockSetPayFormat]);
    spyContext.mockReturnValueOnce({
      countProducts: countProducts,
      removeCountsProductsContext: undefined,
    });

    render(<Checkout />);

    fireEvent.click(screen.getByText('dinheiro'));

    expect(mockSetPayFormat.mock.lastCall).toEqual(['dinheiro']);
  });

  describe('Submit form', () => {
    test('Set loading state', () => {
      spyState
        .mockImplementationOnce(() => ['dinheiro', mockSetPayFormat])
        .mockImplementationOnce(() => [false, mockSetLoading]);
      spyContext.mockReturnValueOnce({
        countProducts: countProducts,
        removeCountsProductsContext: jest.fn(),
      });

      render(<Checkout />);

      expect(mockSetLoading.mock.lastCall).toEqual([true]);
    });

    test('Call function register address and invite correct props', () => {
      spyState
        .mockImplementationOnce(() => ['dinheiro', mockSetPayFormat])
        .mockImplementationOnce(() => [false, jest.fn()]);
      spyContext.mockReturnValueOnce({
        countProducts: countProducts,
        removeCountsProductsContext: jest.fn(),
      });
      mockRegisterAddress.mockReturnValueOnce('2');

      render(<Checkout />);

      expect(mockRegisterAddress).toHaveBeenCalled();
      expect(mockRegisterAddress.mock.results[0].value).toEqual('2');
      expect(mockRegisterAddress.mock.lastCall).toEqual([address]);
    });

    test('AddressId exist not call function register address', () => {
      spyState
        .mockImplementationOnce(() => ['dinheiro', mockSetPayFormat])
        .mockImplementationOnce(() => [false, jest.fn()]);
      spyContext.mockReturnValueOnce({
        countProducts: countProducts,
        removeCountsProductsContext: jest.fn(),
      });

      window.localStorage.setItem('addressId', '2');

      render(<Checkout />);

      expect(mockRegisterAddress).not.toHaveBeenCalled();

      window.localStorage.removeItem('addressId');
    });

    test('Call function update address and invite correct props', () => {
      spyState
        .mockImplementationOnce(() => ['dinheiro', mockSetPayFormat])
        .mockImplementationOnce(() => [false, jest.fn()]);
      spyContext.mockReturnValueOnce({
        countProducts: countProducts,
        removeCountsProductsContext: jest.fn(),
      });

      window.sessionStorage.setItem('editeAddress', 'true');
      window.localStorage.setItem('addressId', '2');

      render(<Checkout />);

      expect(mockUpdateAddress).toHaveBeenCalled();
      expect(mockUpdateAddress.mock.lastCall).toEqual([
        {
          address: address,
          addressId: '2',
        },
      ]);

      window.sessionStorage.removeItem('editeAddress');
      window.localStorage.removeItem('addressId');
    });

    test('EditeAddress no exist not call function update address', () => {
      spyState
        .mockImplementationOnce(() => ['dinheiro', mockSetPayFormat])
        .mockImplementationOnce(() => [false, jest.fn()]);
      spyContext.mockReturnValueOnce({
        countProducts: countProducts,
        removeCountsProductsContext: jest.fn(),
      });

      render(<Checkout />);

      expect(mockUpdateAddress).not.toHaveBeenCalled();
    });

    test('Call function Post shopping and invite correct props', () => {
      spyState
        .mockImplementationOnce(() => ['dinheiro', mockSetPayFormat])
        .mockImplementationOnce(() => [false, jest.fn()]);
      spyContext.mockReturnValueOnce({
        countProducts: countProducts,
        removeCountsProductsContext: jest.fn(),
      });

      window.localStorage.setItem('addressId', '2');

      render(<Checkout />);

      expect(mockPostShopping).toHaveBeenCalled();
      expect(mockPostShopping.mock.lastCall).toEqual([
        {
          addressId: '2',
          buyCoffeeDatas: dataShopping,
          payFormat: 'dinheiro',
        },
      ]);

      window.localStorage.removeItem('addressId');
    });

    test('Call function reset count context and disabled loading', () => {
      spyState
        .mockImplementationOnce(() => ['dinheiro', jest.fn()])
        .mockImplementationOnce(() => [false, mockSetLoading]);
      spyContext.mockReturnValueOnce({
        countProducts: countProducts,
        removeCountsProductsContext: mockRemoveCountsProductsContext,
      });

      window.localStorage.setItem('addressId', '2');

      render(<Checkout />);

      expect(mockRemoveCountsProductsContext).toHaveBeenCalled();
      expect(mockSetLoading.mock.lastCall).toEqual([false]);

      window.localStorage.removeItem('addressId');
    });

    test('Redirection to Confirm page', () => {
      spyState
        .mockImplementationOnce(() => ['dinheiro', jest.fn()])
        .mockImplementationOnce(() => [false, jest.fn()]);
      spyContext.mockReturnValueOnce({
        countProducts: countProducts,
        removeCountsProductsContext: jest.fn(),
      });

      window.localStorage.setItem('addressId', '2');

      render(<Checkout />);

      expect(mockNavigate).toHaveBeenCalled();
      expect(mockNavigate.mock.lastCall).toEqual(['/coffee-delivery/confirm']);

      window.localStorage.removeItem('addressId');
    });
  });
});
