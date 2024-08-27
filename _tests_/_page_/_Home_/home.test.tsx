/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent, render, screen } from '@testing-library/react';
import { Home } from '../../../src/pages/Home';
import { GetCoffees } from '../../../src/pages/Home/hooks/get-coffees';

interface coffeeDatasType {
    id: string;
    name: string;
    slugs: string[];
    tags: string[];
    image: string;
    description: string;
    price: string;
}

type ResponseStatusType = 'loading' | 'complete' | 'error' | 'not-found';

const mockSetResponseStatus = jest.fn();

const returnsGetCoffees = (responseStatus: ResponseStatusType, coffeeDatas: coffeeDatasType[]) => {
    return {
        coffeeDatas,
        responseStatus,
        setResponseStatus: mockSetResponseStatus,
    };
};

jest.mock('../../../src/pages/Home/hooks/get-coffees');
const mockedGetCoffees = jest.mocked(GetCoffees as typeof GetCoffees);

describe('Should page home in status', () => {
    test('loading', () => {
        mockedGetCoffees.mockReturnValue({ ...returnsGetCoffees('loading', []) });

        render(<Home />);

        expect(screen.getByText('Carregando...')).toBeTruthy();
    });

    test('error', () => {
        mockedGetCoffees.mockReturnValue({ ...returnsGetCoffees('error', []) });

        render(<Home />);

        expect(screen.getByText('Error ao tentar carregar os dados.')).toBeTruthy();
    });

    test('not-found', () => {
        mockedGetCoffees.mockReturnValue({ ...returnsGetCoffees('not-found', []) });

        render(<Home />);

        expect(screen.getByText('Nem um dado foi encontrado.')).toBeTruthy();
    });

    test('success', () => {
        const database: coffeeDatasType[] = [
            {
                id: '1',
                name: 'Árabe',
                tags: ['Especial'],
                slugs: ['especial'],
                image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/%C3%A1rabe.png?raw=true',
                description: 'Bebida preparada com grãos de café árabe e especiarias',
                price: '9,90',
            },
            {
                id: '2',
                name: 'Irlandês',
                tags: ['Especial', 'Alcoólico'],
                slugs: ['especial', 'alcoolico'],
                image: 'https://github.com/matheus369k/matheus369k.github.io/blob/main/coffee-delivery-images/irland%C3%AAs.png?raw=true',
                description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
                price: '9,90',
            },
        ];
        mockedGetCoffees.mockReturnValue({ ...returnsGetCoffees('complete', database) });

        render(<Home />);

        expect(screen.getByText(database[0].name)).toBeTruthy();
        expect(screen.getByText(database[1].name)).toBeTruthy();

        expect(screen.getByText(database[0].description)).toBeTruthy();
        expect(screen.getByText(database[1].description)).toBeTruthy();
    });
});

describe('Fire client side events', () => {
    test('Reload page', () => {
        const mockReload = jest.fn();
        jest.spyOn(window, 'location', 'get').mockImplementation(() => {
            return {
                ...Location.prototype,
                reload: () => mockReload(),
            };
        });
        mockedGetCoffees.mockReturnValue({ ...returnsGetCoffees('error', []) });

        render(<Home />);

        fireEvent.click(screen.getByText('Recarregar'));

        expect(mockReload).toHaveBeenCalledTimes(1);
    });
});
