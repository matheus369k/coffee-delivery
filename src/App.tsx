import { RouterProvider } from 'react-router-dom';
import { router } from '@router/Router';
import { ThemeProvider } from 'styled-components';
import { themeDefault } from '@styles/theme/themeDefault';
import { GlobalStyle } from '@styles/global';
import ReactGA from 'react-ga4'
import { env } from './env';

ReactGA.initialize(env.VITE_GA_ID);

export function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <RouterProvider router={router} />
      <GlobalStyle />
    </ThemeProvider>
  );
}
