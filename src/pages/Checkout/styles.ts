import { styled } from 'styled-components';

export const StylesForm = styled.form`
    display: grid;
    grid-template-columns: 60% 40%;
    column-gap: 2rem;

    h3 {
        font-size: 1.125rem;
        font-family: ${(props) => props.theme['title-font']}, sans-serif;

        line-height: 1.3;

        margin-bottom: 1rem;
    }
`;

export const StylesDatasUser = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledAddressUser = styled.div`
    display: flex;
    flex-direction: column;

    gap: 2rem;

    background: ${(props) => props.theme['base-card']};

    padding: 2.5rem;
    border-radius: 6px;

    position: relative;

    div:first-of-type {
        display: flex;
        gap: 0.5rem;

        svg {
            color: ${(props) => props.theme['yellow-dark']};
        }

        p {
            display: flex;
            flex-direction: column;

            span:first-child {
                color: ${(props) => props.theme['base-subtitle']};

                line-height: 1.3;
                font-size: 1rem;
                font-family: ${(props) => props.theme['text-font']}, sans-serif;
            }

            span:last-child {
                color: ${(props) => props.theme['base-text']};

                line-height: 1.3;
                font-size: 0.875rem;
                font-family: ${(props) => props.theme['text-font']}, sans-serif;
            }
        }
    }

    .pencil-edite-address {
        position: absolute;
        right: 2.5rem;
        top: 2.5rem;

        display: flex;
        align-items: center;

        gap: 0.125rem;
        padding: 0.5rem;
        border-radius: 6px;

        font-size: 0.875rem;
        line-height: 1.6;
        text-transform: uppercase;
        font-weight: bold;

        background: ${(props) => props.theme.yellow};
        color: ${(props) => props.theme.white};

        cursor: pointer;
    }

    div:last-of-type {
        display: grid;
        grid-template-columns: 1fr 2fr 3.75rem;
        grid-template-areas:
            'cep cep cep'
            'street street street'
            'number complement complement'
            'neighborhood city uf';

        column-gap: 1rem;
        row-gap: 0.75rem;

        input,
        & > p {
            border: 1px solid ${(props) => props.theme['base-button']};

            background: ${(props) => props.theme['base-input']};
            color: ${(props) => props.theme['base-label']};

            padding: 0.75rem;

            line-height: 1.3;
            font-size: 0.875rem;

            border-radius: 6px;

            &.cep {
                grid-area: cep;
            }
            &.street {
                grid-area: street;
            }
            &.number {
                grid-area: number;
            }
            &.complement {
                grid-area: complement;
            }
            &.neighborhood {
                grid-area: neighborhood;
            }
            &.city {
                grid-area: city;
            }
            &.uf {
                grid-area: uf;
            }
        }

        label {
            grid-area: complement;

            text-align: right;

            padding: 1rem 0.75rem;

            font-size: 0.75rem;
            font-family: ${(props) => props.theme['text-font']};
            font-weight: lighter;

            color: ${(props) => props.theme['base-label']};

            z-index: 2;
        }
    }
`;

export const StylesPayFormat = styled.div`
    display: flex;
    flex-direction: column;

    gap: 2rem;

    background: ${(props) => props.theme['base-card']};

    padding: 2.5rem;
    margin-top: 0.75rem;
    border-radius: 6px;

    div {
        display: flex;
        gap: 0.5rem;

        svg {
            color: ${(props) => props.theme['purple']};
        }

        p {
            display: flex;
            flex-direction: column;

            span:first-child {
                color: ${(props) => props.theme['base-subtitle']};

                line-height: 1.3;
                font-size: 1rem;
                font-family: ${(props) => props.theme['text-font']}, sans-serif;
            }

            span:last-child {
                color: ${(props) => props.theme['base-text']};

                line-height: 1.3;
                font-size: 0.875rem;
                font-family: ${(props) => props.theme['text-font']}, sans-serif;
            }
        }
    }

    ul {
        display: flex;
        column-gap: 0.75rem;

        li {
            display: flex;
            gap: 0.75rem;

            padding: 1rem;

            width: 100%;

            background: ${(props) => props.theme['base-button']};

            border-radius: 6px;

            position: relative;

            input[name='formPayment'] {
                all: unset;

                position: absolute;
                inset: 0;

                width: 100%;
                height: 100%;

                &:checked {
                    box-shadow: 0 0 0 2px ${(props) => props.theme.yellow};

                    border-radius: 6px;
                }
            }

            svg {
                color: ${(props) => props.theme.purple};
            }

            span {
                line-height: 1.6;
                font-size: 0.75rem;

                color: ${(props) => props.theme['base-text']};
            }
        }
    }
`;

export const StylesListCoffee = styled.div`
    display: flex;
    flex-direction: column;

    & > ul,
    & > div {
        background: ${(props) => props.theme['base-card']};

        padding: 2.5rem;
    }

    ul {
        display: flex;
        flex-direction: column;

        gap: 2.5rem;

        border-top-right-radius: 2.75rem;
        border-top-left-radius: 0.375rem;

        li {
            display: grid;
            grid-template-columns: 4rem 1fr 4rem;

            gap: 1.125rem;

            img {
                width: 4rem;
                height: 4rem;
            }

            & > div {
                display: flex;
                flex-direction: column;

                gap: 0.5rem;

                & > div {
                    display: flex;
                    gap: 0.5rem;

                    input {
                        width: 4.5rem;

                        text-align: center;
                        line-height: 1.3;

                        padding: 0.5rem;

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
                    & > div {
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
                        display: flex;
                        align-items: center;

                        gap: 0.25rem;
                        padding: 0 0.5rem;

                        background: ${(props) => props.theme['base-button']};

                        border-radius: 6px;

                        svg {
                            color: ${(props) => props.theme.purple};
                        }

                        span {
                            line-height: 1.6;
                            font-size: 0.75rem;
                            text-transform: uppercase;

                            color: ${(props) => props.theme['base-text']};
                        }
                    }
                }
            }

            & > span {
                color: ${(props) => props.theme['base-text']};

                line-height: 1.3;
                font-size: 1rem;
                font-weight: bold;

                text-align: right;

                &::before {
                    content: 'R$ ';
                }
            }
        }
    }

    & > div {
        display: flex;
        flex-direction: column;

        gap: 0.75rem;

        border-bottom-left-radius: 2.75rem;
        border-bottom-right-radius: 0.375rem;

        p {
            display: flex;
            justify-content: space-between;

            color: ${(props) => props.theme['base-text']};

            span {
                font-size: 0.875rem;
                line-height: 1.3;
            }

            &:last-of-type span {
                font-weight: bold;
                font-size: 1.125rem;
                line-height: 1.3;

                color: ${(props) => props.theme['base-subtitle']};
            }
        }

        & > button {
            width: 100%;

            padding: 0.5rem;
            border-radius: 6px;

            font-size: 0.875rem;
            line-height: 1.6;
            text-transform: uppercase;
            font-weight: bold;

            background: ${(props) => props.theme.yellow};
            color: ${(props) => props.theme.white};
        }
    }
`;

export const StyledEmptyCart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1rem;
    padding: 2rem;

    min-height: 60vh;

    color: ${(props) => props.theme['base-subtitle']};

    svg {
        opacity: 0.4;
    }

    p {
        font-family: ${(props) => props.theme['text-font']};

        text-transform: capitalize;
    }
`;
