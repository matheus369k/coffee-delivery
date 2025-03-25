import { styled } from 'styled-components';

export const StyledShop = styled.div`
  display: flex;
  flex-direction: column;

  gap: 3.5rem;
  padding: 2rem 0;

  & > p {
    text-align: center;
  }

  .request-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;

    button {
      width: max-content;
      padding: 0.5rem 2rem;
      border-radius: 6px;

      font-weight: bold;
      font-size: 1rem;

      background: ${(props) => props.theme['yellow-dark']};
      color: ${(props) => props.theme.white};

      cursor: pointer;

      &:hover {
        background: ${(props) => props.theme['yellow']};
      }
    }
  }
`;

export const StyledShopList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  gap: 3rem 2rem;

  @media (max-width: 549px) {
    gap: 3rem 0.5rem;
  }
`;
