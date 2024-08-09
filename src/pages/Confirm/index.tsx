import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react';
import illustration from '@assets/Illustration.png';
import { StyledConfirmMain } from './styles';
import { useEffect, useState } from 'react';
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
    AddressUser: AddressType;
    form_of_payment: string;
}

export function Confirm() {
    const [dataUser, setDataUser] = useState<DatasUserType | null>(null);

    useEffect(() => {
        api.get(`/shopping/${window.localStorage.shoppingCoffeeListId}`).then((response) => {
            setDataUser(response.data.shoppingCoffeeList);
        });
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
                                Rua {dataUser.AddressUser.street}, {dataUser.AddressUser.number}
                            </span>{' '}
                            <br />
                            {dataUser.AddressUser.neighborhood} - {dataUser.AddressUser.city},{' '}
                            {dataUser.AddressUser.uf}
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
