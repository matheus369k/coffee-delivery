import { ComponentProps } from 'react';

interface ShopFilterRowProps extends ComponentProps<'li'> {
  text: string;
  active?: boolean;
}

export function ShopFilterRow({ text, active = false, ...props }: ShopFilterRowProps) {
  return (
    <li {...props}>
      <button {...(active && { id: 'active' })} type="button" title={'Café' + text}>
        {text}
      </button>
    </li>
  );
}
