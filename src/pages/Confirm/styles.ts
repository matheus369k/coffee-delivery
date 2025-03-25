import { keyframes } from 'styled-components';
import { styled } from 'styled-components';

const initial_loading = keyframes`
    from {
        transform: translateX(-20px);
        opacity: 0.5;
    }
    to {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const StyledConfirmMain = styled.main`
  display: flex;
  flex-direction: column;

  margin: 5.25rem auto;

  h2 {
    font-family: ${(props) => props.theme['title-font']};
    font-size: 2rem;
    line-height: 1.3;

    color: ${(props) => props.theme['yellow-dark']};
  }

  & > p {
    font-family: ${(props) => props.theme['text-font']};
    font-size: 1.25rem;
    line-height: 1.3;

    color: ${(props) => props.theme['base-subtitle']};

    margin-bottom: 2.5rem;
  }

  div {
    display: flex;
    align-items: center;

    gap: 6.375rem;

    opacity: 0;

    animation: ${initial_loading} 1s 0.2s forwards;

    ul {
      flex: 1;

      display: flex;
      flex-direction: column;

      gap: 2rem;
      padding: 2.5rem;

      position: relative;

      &::before {
        content: '';

        position: absolute;
        inset: 0;

        padding: 1px;

        border-radius: 0.375rem 2.25rem;

        background: linear-gradient(
          60deg,
          ${(props) => props.theme.yellow},
          ${(props) => props.theme.purple}
        );

        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#ff1 0 0);

        -webkit-mask-composite: destination-out;
        -webkit-mask-composite: exclude;

        z-index: -1;
      }

      li {
        display: flex;

        gap: 0.75rem;

        p {
          color: ${(props) => props.theme['base-text']};
          font-size: 1rem;

          span {
            font-weight: bold;
          }
        }

        i {
          width: 2.5rem;
          height: 2.5rem;

          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 50%;

          svg {
            fill: ${(props) => props.theme.white};
          }
        }

        & #local {
          background: ${(props) => props.theme.purple};
        }

        & #timer {
          background: ${(props) => props.theme.yellow};
        }

        & #payment {
          background: ${(props) => props.theme['yellow-dark']};
        }
      }
    }

    img {
      width: 30.75rem;
      height: auto;

      opacity: 0;

      animation: ${initial_loading} 1s forwards;
    }
  }

  @media (max-width: 1124px) {
    padding: 1rem;
  }

  @media (max-width: 969px) {
    div {
      display: block;
      text-align: center;

      ul {
        margin-bottom: 2rem;
      }
    }
  }

  @media (max-width: 549px) {
    div > img {
      width: 20rem;
    }
  }
`;
