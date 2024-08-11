import { ComponentProps } from 'react';

interface ShopFilterRowProps extends ComponentProps<'li'> {
    text: string;
}

export function ShopFilterRow({ text, ...props }: ShopFilterRowProps) {
    return (
        <li {...props}>
            <button type="button">{text}</button>
        </li>
    );
}
