import type { ComponentProps } from 'react';
import { StyledInput } from './styles';
import { useFormContext } from 'react-hook-form';

interface InputProps extends ComponentProps<'input'> {
  fieldName: string;
}

export function Input({ fieldName, ...props }: InputProps) {
  const { register } = useFormContext();
  return <StyledInput {...props} data-fieldname={fieldName} {...register(fieldName)} />;
}
