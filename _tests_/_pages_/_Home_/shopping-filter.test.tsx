import { fireEvent, screen } from '@testing-library/dom';
import { Home } from '../../../src/pages/Home';
import {
    coffeeDatasType,
    GetCoffees,
    ResponseStatusType,
} from '../../../src/pages/Home/service/get-coffees';
import { render } from '@testing-library/react';
import React from 'react';

jest.mock('../../../src/pages/Home/service/get-coffees');

const mockSetResponseStatus = jest.fn();
const mockedGetCoffees = jest.mocked(GetCoffees as typeof GetCoffees);
const mockSetStateQuery = jest.fn();

const returnsGetCoffees = (responseStatus: ResponseStatusType, coffeeDatas: coffeeDatasType[]) => {
    return {
        coffeeDatas,
        responseStatus,
        setResponseStatus: mockSetResponseStatus,
    };
};

describe('Shopping Filter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
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
    });

    test('add new filter value', () => {
        jest.spyOn(React, 'useState').mockImplementationOnce(() => ['', mockSetStateQuery]);

        render(<Home />);

        fireEvent.click(screen.getByText('Tradicional'));

        expect(mockSetStateQuery.mock.lastCall).toEqual(['tradicional']);
    });

    test('Add loading status', () => {
        jest.spyOn(React, 'useState').mockImplementationOnce(() => ['', mockSetStateQuery]);

        render(<Home />);

        fireEvent.click(screen.getByText('Tradicional'));

        expect(mockSetResponseStatus.mock.lastCall).toEqual(['loading']);
    });

    test('Add active id to filter element', () => {
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [
            'tradicional',
            mockSetStateQuery,
        ]);

        render(<Home />);

        const button = screen.getByText('Tradicional');
        fireEvent.click(button);

        expect(button).toHaveAttribute('id', 'active');
    });
});
