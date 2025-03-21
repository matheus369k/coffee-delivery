import { Header } from '@components/Header/index';
import { Outlet } from 'react-router';
import { StylesLayoutDefault } from './styles';
import { ContextProviderCountProducts } from '@contexts/context-count-products';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export function LayoutDefault() {
    return (
        <ContextProviderCountProducts>
            <StylesLayoutDefault>
                <Header />
                <QueryClientProvider client={queryClient}>
                    <Outlet />
                </QueryClientProvider>
            </StylesLayoutDefault>
        </ContextProviderCountProducts>
    );
}
