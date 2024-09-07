import { AddressUser } from '../../../../../../src/pages/Checkout/components/form/components/address-user';
import { AddressType } from '../../../../../../src/pages/Checkout/components/form';
import { fireEvent, render, screen } from '@testing-library/react';

const mockHandleHasEditeAddress = jest.fn();

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useFormContext: jest.fn(() => {
        return {
            register: (name: string) => {
                return {
                    'data-testid': name,
                };
            },
        };
    }),
}));

const address: AddressType = {
    cep: '55460000',
    city: 'Recife',
    complement: 'Casa',
    neighborhood: 'Dom pedro primeiro',
    number: 45,
    street: 'Luiz inacio',
    uf: 'PE',
};

describe('Form Address user', () => {
    test('Accept Edite or create address', () => {
        render(
            <AddressUser
                address={address}
                handleHasEditeAddress={mockHandleHasEditeAddress}
                hasEditeAddress={true}
            />,
        );

        expect(screen.getAllByRole('spinbutton')).toHaveLength(2);
        expect(screen.getAllByRole('textbox')).toHaveLength(5);
    });

    test('Read only address', () => {
        render(
            <AddressUser
                address={address}
                handleHasEditeAddress={mockHandleHasEditeAddress}
                hasEditeAddress={false}
            />,
        );

        expect(screen.getAllByRole('paragraph')).toHaveLength(8);

        expect(screen.getByText('Editar')).toBeInTheDocument();
    });

    test('Insert correct datas mode read only', () => {
        render(
            <AddressUser
                address={address}
                handleHasEditeAddress={mockHandleHasEditeAddress}
                hasEditeAddress={false}
            />,
        );

        const { city, complement, neighborhood, street, uf, cep, number } = address;

        expect(screen.getByText(String(cep))).toBeInTheDocument();
        expect(screen.getByText(city)).toBeInTheDocument();
        expect(screen.getByText(complement)).toBeInTheDocument();
        expect(screen.getByText(neighborhood)).toBeInTheDocument();
        expect(screen.getByText(String(number))).toBeInTheDocument();
        expect(screen.getByText(street)).toBeInTheDocument();
        expect(screen.getByText(uf)).toBeInTheDocument();
    });

    test('Insert correct datas mode edite or create', () => {
        render(
            <AddressUser
                address={address}
                handleHasEditeAddress={mockHandleHasEditeAddress}
                hasEditeAddress={true}
            />,
        );

        const { city, complement, neighborhood, street, uf, cep, number } = address;

        expect(screen.getByTestId('cep')).toHaveAttribute('value', String(cep));
        expect(screen.getByTestId('city')).toHaveAttribute('value', city);
        expect(screen.getByTestId('complement')).toHaveAttribute('value', complement);
        expect(screen.getByTestId('neighborhood')).toHaveAttribute('value', neighborhood);
        expect(screen.getByTestId('number')).toHaveAttribute('value', String(number));
        expect(screen.getByTestId('street')).toHaveAttribute('value', street);
        expect(screen.getByTestId('uf')).toHaveAttribute('value', uf);
    });

    test('Call handleHasEditeAddress to active edite address mode', () => {
        render(
            <AddressUser
                address={address}
                handleHasEditeAddress={mockHandleHasEditeAddress}
                hasEditeAddress={false}
            />,
        );

        fireEvent.click(screen.getByText('Editar'));

        expect(mockHandleHasEditeAddress).toHaveBeenCalledTimes(1);
    });
});
