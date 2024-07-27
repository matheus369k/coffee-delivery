import { styled } from 'styled-components';

export const StyledIntroSection = styled.div`
    padding: 3.375rem 0;
    min-height: calc(100vh - 6.5rem);

    display: flex;

    gap: 3.5rem;

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

export const StyledShop = styled.div`
    padding: 2rem 0;

    display: flex;
    flex-direction: column;

    gap: 3.5rem;
`;

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

            button {
                padding: 0.375rem 0.75rem;

                background: transparent;
                color: ${(props) => props.theme['yellow-dark']};

                text-transform: uppercase;
                font-size: 0.625rem;
                line-height: 1.3;
                font-family: ${(props) => props.theme['text-font']}, sans-serif;
            }
        }
    }
`;

export const StyledShopList = styled.ul`
    display: flex;
    flex-wrap: wrap;

    gap: 3rem 2rem;

    li {
        width: 16rem;
        height: 19.375rem;

        padding: 0 1.5rem 1.25rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        background: ${(props) => props.theme['base-card']};

        img {
            width: 7.5rem;
            height: 7.5rem;

            margin-bottom: 0.75rem;

            margin-top: -1.5rem;
        }

        div:first-of-type {
            display: flex;
            gap: 0.25rem;

            span {
                margin-bottom: 1rem;
                padding: 0.25rem 0.5rem;
                border-radius: 100px;

                color: ${(props) => props.theme['yellow-dark']};
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
            font-weight: bold;
            font-family: ${(props) => props.theme['title-font']}, sans-serif;
        }

        p {
            margin-bottom: 2rem;

            text-align: center;
            line-height: 1.3rem;

            font-size: 0.875rem;
            font-family: ${(props) => props.theme['text-font']}, sans-serif;

            color: ${(props) => props.theme['base-label']};
        }

        div:last-of-type {
            display: flex;
            gap: 1.5rem;

            span {
                font-family: ${(props) => props.theme['title-font']}, sans-serif;
                font-size: 1.5rem;
                font-weight: bold;

                line-height: 1.3;

                color: ${(props) => props.theme['base-text']};

                &::before {
                    content: 'R$';

                    font-family: ${(props) => props.theme['text-font']}, sans-serif;
                    font-size: 0.875rem;
                    font-weight: 400;

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
                        font-family: ${(props) => props.theme['text-font']}, sans-serif;

                        background: ${(props) => props.theme['base-button']};
                        color: ${(props) => props.theme['base-title']};

                        border-radius: 6px;

                        &::-webkit-outer-spin-button,
                        &::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                        }
                    }

                    button {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);

                        background: transparent;
                        box-shadow: 0;
                        border: 0;
                        line-height: 0;

                        z-index: 1;

                        &:first-of-type {
                            left: 2.5px;
                        }

                        &:last-of-type {
                            right: 2.5px;
                        }
                    }
                }

                & > button {
                    height: 2.375rem;
                    width: 2.375rem;

                    border-radius: 6px;

                    background: ${(props) => props.theme['purple-dark']};

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    svg {
                        fill: ${(props) => props.theme['base-card']};
                    }
                }
            }
        }
    }
`;
