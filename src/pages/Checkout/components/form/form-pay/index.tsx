import { Bank, CreditCard, CurrencyDollar, Money } from "@phosphor-icons/react";
import { StylesFormPay } from "../styles";
import { ItemPaymentContent, ItemPaymentRoot } from "./item-payment";
import { PaymentTypeContext } from "@contexts/payment-type-context";
import { useContext } from "react";

export function FormPay() {
  const { addPaymentType } = useContext(PaymentTypeContext);

  return (
    <StylesFormPay>
      <div>
        <CurrencyDollar size={22} />
        <p>
          <span>Pagamento</span>
          <span>
            O pagamento é feito na entrega. Escolha a forma que deseja pagar
          </span>
        </p>
      </div>
      <div>
        <ItemPaymentRoot
          aria-label="credit_card"
          onClick={() => addPaymentType("Cartão de crédito")}
        >
          <CreditCard size={16} />
          <ItemPaymentContent>Cartão de crédito</ItemPaymentContent>
        </ItemPaymentRoot>
        <ItemPaymentRoot
          aria-label="debt_card"
          onClick={() => addPaymentType("cartão de débito")}
        >
          <Bank size={16} />
          <ItemPaymentContent>cartão de débito</ItemPaymentContent>
        </ItemPaymentRoot>
        <ItemPaymentRoot
          aria-label="money"
          onClick={() => addPaymentType("dinheiro")}
        >
          <Money size={16} />
          <ItemPaymentContent>dinheiro</ItemPaymentContent>
        </ItemPaymentRoot>
      </div>
    </StylesFormPay>
  );
}
