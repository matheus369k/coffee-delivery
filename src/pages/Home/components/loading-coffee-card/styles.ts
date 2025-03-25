import styled, { keyframes } from 'styled-components';

const pulse_card = keyframes`
    from {
        opacity: 0.7;
    }
    to {
        opacity: 1;
    }
`;

export const StyledLoadingCoffeeCard = styled.li`
  width: 16rem;
  height: 19.375rem;
  padding: 0 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme['base-card']};
  animation-name: ${pulse_card};
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: 1s;
  user-select: none;
  -webkit-user-select: none;

  .image {
    width: 7.5rem;
    height: 7.5rem;
    margin-bottom: 0.75rem;
    margin-top: -1.5rem;
    background: ${(props) => props.theme['base-input']};
  }

  div:first-of-type {
    display: flex;
    gap: 0.25rem;

    span {
      margin-bottom: 1rem;
      padding: 0.25rem 0.5rem;
      border-radius: 100px;
      color: ${(props) => props.theme['yellow-light']};
      background: ${(props) => props.theme['yellow-light']};
      line-height: 1.3;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.625rem;
      font-family: ${(props) => props.theme['text-font']}, sans-serif;
    }
  }

  h3 {
    margin-bottom: 0.5rem;
    line-height: 1.3;
    font-size: 1.25rem;
    background: ${(props) => props.theme['base-input']};
    color: ${(props) => props.theme['base-input']};
  }

  p {
    margin-bottom: 2rem;
    text-align: center;
    line-height: 1.3rem;
    font-size: 0.875rem;
    background: ${(props) => props.theme['base-input']};
    color: ${(props) => props.theme['base-input']};
  }

  div:last-of-type {
    display: flex;
    gap: 1.5rem;

    span {
      font-size: 1.5rem;
      line-height: 1.3;
      background: ${(props) => props.theme['base-input']};
      color: ${(props) => props.theme['base-input']};

      &::before {
        content: 'R$';
        font-size: 0.875rem;
        line-height: 1.3;
      }
    }

    form {
      display: flex;
      gap: 0.5rem;

      div {
        display: flex;
        justify-content: space-between;
        align-content: center;
        position: relative;

        input {
          width: 4.5rem;
          text-align: center;
          line-height: 1.3;
          font-size: 1rem;
          background: ${(props) => props.theme['base-input']};
          color: ${(props) => props.theme['base-input']};
          border-radius: 6px;
        }
      }

      & > button {
        height: 2.375rem;
        width: 2.375rem;
        border-radius: 6px;
        background: ${(props) => props.theme['base-input']};
        color: ${(props) => props.theme['base-input']};
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @media (max-width: 549px) {
    p {
      margin-bottom: 1rem;
    }

    form {
      gap: 0.25rem;
    }
  }
`;
