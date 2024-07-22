import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/Router';
import { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/theme/themeDefault';
import { GlobalStyle } from './styles/global';

export function App() {
    return (
        <ThemeProvider theme={themeDefault}>
            <RouterProvider router={router} />
            <GlobalStyle />
        </ThemeProvider>
    );
}
