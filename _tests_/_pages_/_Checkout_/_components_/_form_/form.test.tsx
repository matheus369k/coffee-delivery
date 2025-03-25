import { fireEvent, render, screen } from '@testing-library/react';
import { AddressType, FormUser } from '@pages/Checkout/components/form';
import { GetUserAddressPropsType } from '@pages/Checkout/components/form/service/get-user-address';
import { GetAddressViaCepPropsType } from '@pages/Checkout/components/form/service/get-viacep';
import React from 'react';

const mockSetNewPayFormat = jest.fn();
const mockGetAddressViaCep = jest.fn();
const mockGetUserAddress = jest.fn();
const mockWatch = jest.fn();
const mockSetValue = jest.fn();
const mockEditeSetState = jest.fn();

const spyState = jest.spyOn(React, 'useState');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (effect: () => void, deps?: unknown[]) => {
    effect();
    deps;
  },
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: jest.fn(() => {
    return {
      watch: () => mockWatch(),
      setValue: (key: string, value: string) => mockSetValue({ [key]: value }),
      register: jest.fn(),
    };
  }),
}));

jest.mock('@pages/Checkout/components/form/service/get-viacep', () => ({
  GetAddressViaCep: (props: GetAddressViaCepPropsType) => mockGetAddressViaCep(props),
}));

jest.mock('@pages/Checkout/components/form/service/get-user-address', () => ({
  GetUserAddress: (props: GetUserAddressPropsType) => mockGetUserAddress(props),
}));

const address: AddressType = {
  cep: '55460000',
  city: 'Recife',
  complement: '',
  neighborhood: 'Dom pedro primeiro',
  number: 45,
  street: 'Luiz inacio',
  uf: 'PE',
};

describe('Checkout form', () => {
  afterAll(() => {
    window.sessionStorage.removeItem('editeAddress');
  });

  test('Call get address from Viacep', () => {
    mockWatch.mockReturnValueOnce('55340000');

    render(<FormUser setNewPayFormat={mockSetNewPayFormat} />);

    expect(mockGetAddressViaCep).toHaveBeenCalled();
  });

  test('Call get address from user datas', () => {
    window.localStorage.setItem('addressId', '1');

    render(<FormUser setNewPayFormat={mockSetNewPayFormat} />);

    expect(mockGetUserAddress).toHaveBeenCalled();
  });

  test('Call setValue and get correct datas', () => {
    window.localStorage.setItem('addressId', '1');
    mockGetUserAddress.mockImplementationOnce((props: GetUserAddressPropsType) => {
      props.setInUseFormNewAddress(address);
    });

    render(<FormUser setNewPayFormat={mockSetNewPayFormat} />);

    const { city, complement, neighborhood, street, uf, cep, number } = address;
    const CallsSetValue = mockSetValue.mock.calls;

    expect(CallsSetValue).toContainEqual([{ cep }]);
    expect(CallsSetValue).toContainEqual([{ city }]);
    expect(CallsSetValue).toContainEqual([{ number }]);
    expect(CallsSetValue).toContainEqual([{ complement }]);
    expect(CallsSetValue).toContainEqual([{ neighborhood }]);
    expect(CallsSetValue).toContainEqual([{ street }]);
    expect(CallsSetValue).toContainEqual([{ uf }]);
  });

  test('Call function and disabled edite address', () => {
    spyState.mockImplementationOnce(() => [true, mockEditeSetState]);
    window.localStorage.setItem('addressId', '1');
    mockGetUserAddress.mockImplementationOnce((props: GetUserAddressPropsType) => {
      props.handleDisabledEditeAddress();
    });

    render(<FormUser setNewPayFormat={mockSetNewPayFormat} />);

    expect(mockEditeSetState).toHaveBeenCalled();
    expect(mockEditeSetState.mock.lastCall).toEqual([false]);
  });

  test('Call function and set new format pay', () => {
    spyState.mockImplementationOnce(() => [false, mockEditeSetState]);

    render(<FormUser setNewPayFormat={mockSetNewPayFormat} />);

    fireEvent.click(screen.getByText('dinheiro'));

    expect(mockSetNewPayFormat).toHaveBeenCalled();
    expect(mockSetNewPayFormat.mock.lastCall).toEqual(['dinheiro']);
  });

  test('Call function and enabled edite address mode', () => {
    spyState.mockImplementationOnce(() => [false, mockEditeSetState]);

    render(<FormUser setNewPayFormat={mockSetNewPayFormat} />);

    fireEvent.click(screen.getByText('Editar'));

    expect(mockEditeSetState).toHaveBeenCalled();
    expect(mockEditeSetState.mock.lastCall).toEqual([true]);

    expect(window.sessionStorage.editeAddress).toEqual('true');
  });
});
