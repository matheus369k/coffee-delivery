import { Header } from '@components/Header/index';
import { Outlet } from 'react-router';
import { StylesLayoutDefault } from './styles';
import { ContextProviderCountProducts } from '../contexts/context-count-products';
import { ContextProviderDatasUser } from '@/contexts/context-user-datas';

export function LayoutDefault() {
    return (
        <ContextProviderCountProducts>
            <StylesLayoutDefault>
                <Header />
                <ContextProviderDatasUser>
                    <Outlet />
                </ContextProviderDatasUser>
            </StylesLayoutDefault>
        </ContextProviderCountProducts>
    );
}
