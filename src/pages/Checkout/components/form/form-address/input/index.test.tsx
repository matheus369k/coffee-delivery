import { render, screen } from '@testing-library/react';
import { Input } from './index';
import { useFormContext } from 'react-hook-form';

jest.mock('react-hook-form');

describe('Input', () => {
  const MockRegister = jest.fn();
  const defaultProps = {
    fieldName: 'test-field',
    type: 'text',
    placeholder: 'Enter text',
    defaultValue: 'test value',
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValueOnce({
      register: MockRegister,
    });
  });

  test('should render input with correct props', () => {
    render(<Input {...defaultProps} />);

    const { placeholder, type, defaultValue, fieldName } = defaultProps;
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', type);
    expect(inputElement).toHaveAttribute('value', defaultValue);
    expect(inputElement).toHaveAttribute('data-fieldname', fieldName);
  });

  test('Register to Hookform should receive corrected prop', () => {
    render(<Input {...defaultProps} />);

    const { fieldName, placeholder } = defaultProps;
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
    expect(MockRegister).toHaveBeenCalledWith(fieldName);
  });
});
