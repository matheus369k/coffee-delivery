import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react';
import illustration from '@assets/Illustration.png';
import { StyledConfirmMain } from './styles';
import { DatasUserContext } from '@/contexts/context-user-datas';
import { useContext } from 'react';

export function Confirm() {
    const { dataUserContext } = useContext(DatasUserContext);

    if (!dataUserContext) {
        return;
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
                            Entrega em{' '}
                            <span>
                                Rua {dataUserContext.address.street}, {dataUserContext.address.number}
                            </span>{' '}
                            <br />
                            {dataUserContext.address.neighborhood} - {dataUserContext.address.city}, {dataUserContext.address.uf}
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
                            <span>{dataUserContext.payFormat}</span>
                        </p>
                    </li>
                </ul>

                <img src={illustration} alt="" />
            </div>
        </StyledConfirmMain>
    );
}
