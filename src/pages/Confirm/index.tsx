import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react';
import illustration from '@assets/Illustration.png';
import { StyledConfirmMain } from './styles';
import { SetStateAction, useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface AddressType {
    id: string;
    cep: number;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    city: string;
    uf: string;
}

interface DatasUserType {
    addresses: AddressType;
    form_of_payment: string;
}

export function Confirm() {
    const [dataUser, setDataUser] = useState<DatasUserType | null>(null);

    useEffect(() => {
        api.get(`/shopping/${window.localStorage.shoppingId}`).then(
            (response: { data: { shopping: SetStateAction<DatasUserType | null> } }) => {
                setDataUser(response.data.shopping);
            },
        );
    }, []);

    if (!dataUser) {
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
                                Rua {dataUser.addresses.street}, {dataUser.addresses.number}
                            </span>{' '}
                            <br />
                            {dataUser.addresses.neighborhood} - {dataUser.addresses.city},{' '}
                            {dataUser.addresses.uf}
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
                            <span>{dataUser.form_of_payment}</span>
                        </p>
                    </li>
                </ul>

                <img src={illustration} alt="" />
            </div>
        </StyledConfirmMain>
    );
}
