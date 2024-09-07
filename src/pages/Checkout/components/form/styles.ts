import styled from 'styled-components';

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

            line-height: 1.4;
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

            margin-left: auto;

            padding: 1rem 0.75rem;
            width: max-content;

            font-size: 0.75rem;
            font-family: ${(props) => props.theme['text-font']};
            font-weight: lighter;

            color: ${(props) => props.theme['base-label']};

            z-index: 2;
        }
    }

    @media (max-width: 569px) {
        padding: 1rem;

        div:last-of-type {
            grid-template-columns: 1fr 2fr 3.75rem;
            grid-template-areas:
                'cep cep cep'
                'street street street'
                'number number number'
                'complement complement complement'
                'neighborhood neighborhood neighborhood'
                'city city uf';
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

    @media (max-width: 569px) {
        padding: 1rem;

        & > ul {
            flex-direction: column;

            gap: 1rem;

            li {
                justify-content: center;
            }
        }
    }
`;
