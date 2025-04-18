import styled from 'styled-components';

export const StyledInput = styled.input`
  border: 1px solid ${(props) => props.theme['base-button']};

  background: ${(props) => props.theme['base-input']};
  color: ${(props) => props.theme['base-label']};

  padding: 0.75rem;

  line-height: 1.4;
  font-size: 0.875rem;

  border-radius: 6px;

  &[data-fieldname='cep'] {
    grid-area: cep;
  }
  &[data-fieldname='street'] {
    grid-area: street;
  }
  &[data-fieldname='number'] {
    grid-area: number;
  }
  &[data-fieldname='complement'] {
    grid-area: complement;
  }
  &[data-fieldname='neighborhood'] {
    grid-area: neighborhood;
  }
  &[data-fieldname='city'] {
    grid-area: city;
  }
  &[data-fieldname='uf'] {
    grid-area: uf;
  }

  &:read-only:focus {
    border: 1px solid ${(props) => props.theme['base-button']};
    outline: none;
    box-shadow: none;
  }
`;
