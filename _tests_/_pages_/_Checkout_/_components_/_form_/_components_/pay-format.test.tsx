import { fireEvent, render, screen } from '@testing-library/react';
import { PayFormat } from '@pages/Checkout/components/form/components/pay-format';

const mockHandleGetPayFormat = jest.fn();

describe('Pay format', () => {
  beforeEach(() => {
    render(<PayFormat handleGetPayFormat={mockHandleGetPayFormat} />);

    const payFormats = screen.getAllByRole('listitem');

    fireEvent.click(payFormats[0]);
    fireEvent.click(payFormats[1]);
    fireEvent.click(payFormats[2]);
  });

  test('Call function get pay format', () => {
    expect(mockHandleGetPayFormat).toHaveBeenCalledTimes(3);
  });

  test('Invite correct pay format', () => {
    expect(mockHandleGetPayFormat.mock.calls).toEqual([
      ['Cartão de crédito'],
      ['cartão de débito'],
      ['dinheiro'],
    ]);
  });
});
