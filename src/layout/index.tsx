import { Header } from '@components/Header/index';
import { Outlet } from 'react-router';
import { StylesLayoutDefault } from './styles';
import { ContextProviderCountProducts } from '../contexts/context-count-products';

export function LayoutDefault() {
    return (
        <ContextProviderCountProducts>
            <StylesLayoutDefault>
                <Header />
                <Outlet />
            </StylesLayoutDefault>
        </ContextProviderCountProducts>
    );
}
