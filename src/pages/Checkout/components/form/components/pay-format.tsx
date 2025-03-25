import { Bank, CreditCard, CurrencyDollar, Money } from '@phosphor-icons/react';
import { StylesPayFormat } from '../styles';

export function PayFormat({
  handleGetPayFormat,
}: {
  handleGetPayFormat: (payForm: string) => void;
}) {
  return (
    <StylesPayFormat>
      <div>
        <CurrencyDollar size={22} />
        <p>
          <span>Pagamento</span>
          <span>O pagamento é feito na entrega. Escolha a forma que deseja pagar</span>
        </p>
      </div>
      <ul>
        <li onClick={() => handleGetPayFormat('Cartão de crédito')}>
          <input type="radio" name="formPayment" />
          <CreditCard size={16} />
          <span>Cartão de crédito</span>
        </li>
        <li onClick={() => handleGetPayFormat('cartão de débito')}>
          <input type="radio" name="formPayment" />
          <Bank size={16} />
          <span>cartão de débito</span>
        </li>
        <li onClick={() => handleGetPayFormat('dinheiro')}>
          <input type="radio" name="formPayment" />
          <Money size={16} />
          <span>dinheiro</span>
        </li>
      </ul>
    </StylesPayFormat>
  );
}
