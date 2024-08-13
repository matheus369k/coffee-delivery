import styled from 'styled-components';
import { keyframes } from 'styled-components';

const initial_loading = keyframes`
    from {
        transform: translateY(-20px);
        opacity: 0.5;
    }
    to {
        transform: translateY(0px);
        opacity: 1;
    }
`;

export const StyledIntroSection = styled.div`
    padding: 3.375rem 0;
    min-height: calc(100vh - 6.5rem);

    display: flex;

    gap: 3.5rem;

    opacity: 0;

    position: relative;
    animation: ${initial_loading} 1s forwards;

    h1 {
        margin-bottom: 1rem;

        font-size: 3rem;
        line-height: 1.3;
        font-family: ${(props) => props.theme['title-font']}, sans-serif;

        color: ${(props) => props.theme['base-title']};
    }

    span {
        display: block;
        margin-bottom: 4.125rem;

        font-size: 1.5rem;
        line-height: 1.3;
        font-family: ${(props) => props.theme['title-font']}, sans-serif;

        color: ${(props) => props.theme['base-subtitle']};
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        column-gap: 2.5rem;
        row-gap: 1.25rem;

        li {
            display: flex;
            align-items: center;

            gap: 0.75rem;

            width: max-content;

            i {
                height: 2rem;
                width: 2rem;

                border-radius: 50%;

                display: flex;
                align-items: center;
                justify-content: center;

                &#cart {
                    background: ${(props) => props.theme['yellow-dark']};
                }
                &#timer {
                    background: ${(props) => props.theme.yellow};
                }
                &#box {
                    background: ${(props) => props.theme['base-text']};
                }
                &#coffee {
                    background: ${(props) => props.theme.purple};
                }

                svg {
                    fill: white;
                }
            }

            span {
                font-size: 1rem;
                font-family: ${(props) => props.theme['text-font']}, sans-serif;
                line-height: 1.3;

                color: ${(props) => props.theme['base-text']};
            }
        }
    }

    img {
        width: 29.75rem;
        height: 22.5rem;
    }
`;
