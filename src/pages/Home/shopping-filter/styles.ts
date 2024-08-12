import styled from 'styled-components';

export const StyledShopFilter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
        font-size: 2rem;
        line-height: 1.3rem;

        color: ${(props) => props.theme['base-title']};
    }

    ul {
        display: flex;
        gap: 0.5rem;

        li {
            border: 1px solid ${(props) => props.theme.yellow};
            border-radius: 100px;

            overflow: hidden;

            button {
                padding: 0.375rem 0.75rem;

                background: transparent;
                color: ${(props) => props.theme['yellow-dark']};

                text-transform: uppercase;
                font-size: 0.625rem;
                line-height: 1.3;
                font-family: ${(props) => props.theme['text-font']}, sans-serif;

                cursor: pointer;
                transition:
                    color,
                    background 0.2s;
            }

            button#active {
                color: ${(props) => props.theme['yellow-light']};
                background: ${(props) => props.theme['yellow-dark']};

                cursor: default;
            }
        }
    }
`;
