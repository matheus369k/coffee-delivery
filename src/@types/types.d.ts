import 'styled-components';
import { themeDefault } from '@styles/theme/themeDefault';

type themeType = typeof themeDefault;

declare module 'styled-components' {
    export interface DefaultTheme extends themeType {}
}
