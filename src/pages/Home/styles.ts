import { styled, keyframes } from 'styled-components';

const scroll_hidden = keyframes`
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0%);
        opacity: 1;
    }
`;

export const StyledShop = styled.div`
    min-height: 25rem;
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

        animation-name: ${scroll_hidden};
        animation-timeline: view();
        animation-range: cover 0% cover 20%;

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
