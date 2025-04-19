import { createContext, useState } from "react";

export interface PaymentTypeContextType {
  paymentType: string;
  addPaymentType: (paymentType: string) => void;
  resetPaymentType: () => void;
}

export const PaymentTypeContext = createContext({} as PaymentTypeContextType);

export function PaymentTypeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [paymentType, setPaymentType] = useState("");

  function addPaymentType(payment: string) {
    setPaymentType(payment);
  }

  function resetPaymentType() {
    setPaymentType("");
  }

  return (
    <PaymentTypeContext.Provider
      value={{ paymentType, addPaymentType, resetPaymentType }}
    >
      {children}
    </PaymentTypeContext.Provider>
  );
}
