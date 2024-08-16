import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        border: 0;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme.yellow};

    }

    ul {
        list-style: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;

        margin: 0;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }

    a {
        text-decoration: none;
    }

    body {
        background: ${(props) => props.theme.background};
        color: ${(props) => props.theme['base-text']};

        scroll-behavior: smooth;
    }

    body, button, input, textarea {
        font-size: 1rem;
        font-weight: 400;
        font-family: ${(props) => props.theme['text-font']}, sans-serif;
        
        -webkit-font-smock: antialiased;
    }

    h1, h2, h3 {
        color: ${(props) => props.theme['base-title']};
        font-family: ${(props) => props.theme['title-font']}, sans-serif;
    }
`;
