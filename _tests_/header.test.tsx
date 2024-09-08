import { Header, UserLocationType } from '../src/components/Header';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CountProductsType } from '../src/contexts/context-count-products';

const mockNavigate = jest.fn();
const mockRequestUrl = jest.fn();
const mockLocationState = jest.fn();

const spyContext = jest.spyOn(React, 'useContext');
const spyState = jest.spyOn(React, 'useState');
const spyLocation = jest.spyOn(window, 'location', 'get');

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

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: (effect: () => void, deps?: unknown[]) => {
        effect();
        deps;
    },
}));

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    create: (configs: { baseURL: string }) => {
        return {
            get: (pathName: string) => {
                mockRequestUrl(configs.baseURL.concat(pathName));

                return {
                    then: (
                        handleResponse: (response: {
                            data: { userLocation: UserLocationType };
                        }) => void,
                    ) => {
                        handleResponse({
                            data: {
                                userLocation: {
                                    city: 'Recife',
                                    uf: 'PE',
                                },
                            },
                        });
                    },
                };
            },
        };
    },
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Header Component', () => {
    test('Insert correct initial State in location', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);

        render(<Header />);

        expect(screen.getByText('Cidade, UF')).toBeInTheDocument();
    });

    test('Disabled cart button when count for empty', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts: [] }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);

        render(<Header />);

        expect(screen.getByTitle('Cart')).toBeDisabled();
    });

    test('Enabled cart button when count not for empty', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);

        render(<Header />);

        expect(screen.getByTitle('Cart')).toBeEnabled();
    });

    test('Hidden back button when it`s home page', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts: [] }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);
        spyLocation.mockImplementationOnce(() => ({
            ...window.location,
            pathname: '/coffee-delivery',
        }));

        render(<Header />);

        expect(screen.getByTitle('Voltar')).not.toBeVisible();
    });

    test('Show back button when it`s checkout page', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts: [] }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);
        spyLocation.mockImplementationOnce(() => ({
            ...window.location,
            pathname: '/coffee-delivery/checkout',
        }));

        render(<Header />);

        expect(screen.getByTitle('Voltar')).toBeVisible();
    });

    test('Show back button when it`s confirm page', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts: [] }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);
        spyLocation.mockImplementationOnce(() => ({
            ...window.location,
            pathname: '/coffee-delivery/confirm',
        }));

        render(<Header />);

        expect(screen.getByTitle('Voltar')).toBeVisible();
    });

    test('Redirect to checkout page to clicking cart icon', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);

        render(<Header />);

        fireEvent.click(screen.getByTitle('Cart'));

        expect(mockNavigate.mock.lastCall).toContainEqual('/coffee-delivery/checkout');
    });

    test('Clicking on the logo to back home page', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);

        render(<Header />);

        fireEvent.click(screen.getByRole('img'));

        expect(mockNavigate.mock.lastCall).toContainEqual('/coffee-delivery');
    });

    test('Clicking on the icon of the arrowLeft to back home page', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);

        render(<Header />);

        fireEvent.click(screen.getByTitle('Voltar'));

        expect(mockNavigate.mock.lastCall).toContainEqual('/coffee-delivery');
    });

    test('Insert correct url on the request api', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', jest.fn()]);
        window.localStorage.setItem('addressId', '2');

        render(<Header />);

        const requestUrl = 'https://coffee-delivery-api-1.onrender.com/location/2';
        expect(mockRequestUrl.mock.lastCall).toContainEqual(requestUrl);
    });

    test('State get correct format of the datas the request api', () => {
        spyContext.mockImplementationOnce(() => ({ countProducts }));
        spyState.mockImplementationOnce(() => ['Cidade, UF', mockLocationState]);
        window.localStorage.setItem('addressId', '2');

        render(<Header />);

        expect(mockLocationState.mock.lastCall).toContainEqual('Recife, PE');
    });
});
