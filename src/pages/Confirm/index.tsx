import { CurrencyDollar, MapPin, Timer } from "@phosphor-icons/react";
import illustration from "@assets/Illustration.png";
import { StyledConfirmMain } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getShopping } from "./services/get-shopping";

export function Confirm() {
  const shoppingId = window.localStorage.shoppingId;
  const { data, isFetching } = useQuery({
    queryKey: ["shopping", shoppingId],
    queryFn: async () => await getShopping(shoppingId),
  });

  if (!data || isFetching) {
    return null;
  }

  return (
    <StyledConfirmMain>
      <h2>Uhu! Pedido confirmado</h2>

      <p>Agora é só aguardar que logo o café chegará até você</p>

      <div>
        <ul>
          <li>
            <i id="local">
              <MapPin size="16px" weight="fill" />
            </i>

            <p>
              Entrega em{" "}
              <span>
                Rua {data.addresses.street}, {data.addresses.number}
              </span>{" "}
              <br />
              {data.addresses.neighborhood} - {data.addresses.city},{" "}
              {data.addresses.uf}
            </p>
          </li>

          <li>
            <i id="timer">
              <Timer size="16px" weight="fill" />
            </i>

            <p>
              Previsão de entrega <br />
              <span>20 min - 30 min</span>
            </p>
          </li>

          <li>
            <i id="payment">
              <CurrencyDollar size="16px" weight="fill" />
            </i>

            <p>
              Pagamento na entrega <br />
              <span>{data.form_of_payment}</span>
            </p>
          </li>
        </ul>
        <img src={illustration} alt="illustration" />
      </div>
    </StyledConfirmMain>
  );
}
