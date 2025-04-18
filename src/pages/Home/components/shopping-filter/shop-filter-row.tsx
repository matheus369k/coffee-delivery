import { ComponentProps } from "react";

interface ShopFilterRowButtonProps extends ComponentProps<"button"> {
  active?: boolean;
}

export function ShopFilterRowButton({
  active,
  ...props
}: ShopFilterRowButtonProps) {
  return <button {...props} {...(active && { id: "active" })} type="button" />;
}
