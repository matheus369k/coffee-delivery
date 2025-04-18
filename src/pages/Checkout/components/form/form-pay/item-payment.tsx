import type { ComponentProps } from "react";

interface ItemPaymentRootProps extends ComponentProps<"button"> {}
export function ItemPaymentRoot({ children, ...props }: ItemPaymentRootProps) {
  return (
    <button {...props}>
      <input type="radio" name="formPayment" />
      {children}
    </button>
  );
}

interface ItemPaymentContentProps extends ComponentProps<"span"> {}

export function ItemPaymentContent({ ...props }: ItemPaymentContentProps) {
  return <span {...props} />;
}
