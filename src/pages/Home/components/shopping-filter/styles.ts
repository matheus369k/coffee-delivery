import { styled, keyframes } from "styled-components";

const scroll_hidden = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const StyledShopFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  animation-name: ${scroll_hidden};
  animation-fill-mode: forwards;
  animation-timeline: view();
  animation-range: cover 0% cover 15%;

  h2 {
    font-size: 2rem;
    line-height: 1.3rem;

    color: ${(props) => props.theme["base-title"]};
  }

  div {
    display: flex;
    gap: 0.5rem;

    button {
      border: 1px solid ${(props) => props.theme.yellow};
      border-radius: 100px;

      overflow: hidden;
      padding: 0.375rem 0.75rem;

      background: transparent;
      color: ${(props) => props.theme["yellow-dark"]};

      text-transform: uppercase;
      font-size: 0.625rem;
      font-weight: bolder;
      line-height: 1.3;
      font-family: ${(props) => props.theme["text-font"]}, sans-serif;

      cursor: pointer;
      transition: color, background 0.2s;

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    button#active {
      color: ${(props) => props.theme["yellow-light"]};
      background: ${(props) => props.theme["yellow-dark"]};

      cursor: default;
    }
  }

  @media (max-width: 1124px) {
    padding: 0 3.375rem;
  }

  @media (max-width: 993px) {
    flex-direction: column;

    gap: 2rem;
  }

  @media (max-width: 549px) {
    padding: 0 1rem;

    div {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;
