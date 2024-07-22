import { Header } from '@components/Header/index';
import { Outlet } from 'react-router';
import { StylesLayoutDefault } from './styles';

export function LayoutDefault() {
    return (
        <StylesLayoutDefault>
            <Header />
            <Outlet />
        </StylesLayoutDefault>
    );
}
