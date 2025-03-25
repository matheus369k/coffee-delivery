import { styled, keyframes } from 'styled-components';

const pulse = keyframes`
    from {
        transform: scale(1);
        box-shadow: 0 0 0px rgba(200, 120, 20, .8);
    }
    to {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(200, 120, 20, .8);
    }
`;

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 2rem 0 3.25rem;
  padding: 1rem;

  background: ${(props) => props.theme.background};

  position: sticky;
  top: 0;

  z-index: 10;

  img {
    height: 2.5rem;
    width: 5.25rem;

    cursor: pointer;
  }

  button:first-of-type {
    background: transparent;
    box-shadow: 0;
    outline: 0;

    margin-right: 1rem;

    cursor: pointer;
  }

  div {
    display: flex;
    gap: 0.875rem;

    p {
      background: ${(props) => props.theme['purple-light']};

      border-radius: 6px;
      padding: 0.5rem;

      display: flex;
      align-items: center;

      gap: 0.125rem;

      span {
        color: ${(props) => props.theme['purple-dark']};
        font-size: 0.875rem;
        line-height: 1.3;
      }

      svg {
        color: ${(props) => props.theme.purple};
      }
    }

    button:last-of-type {
      padding: 0.5rem;
      border-radius: 6px;
      line-height: 0;

      background: ${(props) => props.theme['yellow-light']};

      position: relative;

      &:not([data-count-products='0'])::before {
        content: attr(data-count-products);

        height: 1.25rem;
        width: 1.25rem;

        background: ${(props) => props.theme['yellow-dark']};
        color: ${(props) => props.theme.white};

        border-radius: 50%;

        font-size: 0.75rem;
        font-weight: bold;
        line-height: 0;

        position: absolute;
        top: -0.5rem;
        right: -0.5rem;

        display: flex;
        justify-content: center;
        align-items: center;

        animation: ${pulse} 1s ease-in 5 alternate-reverse;
      }

      svg {
        color: ${(props) => props.theme['yellow-dark']};

        path {
          fill: ${(props) => props.theme['yellow-dark']};
        }
      }
    }
  }
`;
