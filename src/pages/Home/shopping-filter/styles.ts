import { styled, keyframes } from 'styled-components';

const scroll_hidden = keyframes`
    from {
        transform: translateY(200px);
        opacity: 0;
    }
    50% {
        transform: translateY(0);
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
