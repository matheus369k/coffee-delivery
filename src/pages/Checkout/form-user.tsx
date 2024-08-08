import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from '@phosphor-icons/react';
import { StyledAddressUser, StylesDatasUser, StylesPayFormat } from './styles';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

interface AddressUser {
    street: string;
    complement: string;
    neighborhood: string;
    city: string;
    uf: string;
}

export function FormUser({ setNewPayFormat }: { setNewPayFormat: (payFormat: string) => void }) {
    const { register, watch } = useFormContext();
    const cep: number = watch('cep');

    const [addressUser, setAddressUser] = useState<AddressUser>({
        city: '',
        complement: '',
        neighborhood: '',
        street: '',
        uf: '',
    });

    useEffect(() => {
        if (cep && cep.toString().length >= 8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => {
                setAddressUser({
                    city: resp.data.localidade,
                    complement: resp.data.complemento,
                    neighborhood: resp.data.bairro,
                    street: resp.data.logradouro,
                    uf: resp.data.uf,
                });
            });
        }
    }, [cep]);

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const body = { [event.target.name]: event.target.value };

        setAddressUser((state) => {
            return {
                ...state,
                ...body,
            };
        });
    }

    function handleGetPayFormat(payForm: string) {
        setNewPayFormat(payForm);
    }

    return (
        <StylesDatasUser>
            <h3>Complete seu pedido</h3>
            <StyledAddressUser>
                <div>
                    <MapPin size={22} />
                    <p>
                        <span>Endereço de Entrega</span>
                        <span>Informe o endereço onde deseja receber seu pedido</span>
                    </p>
                </div>
                <div>
                    <input {...register('cep')} required autoSave="off" type="number" id="cep" placeholder="CEP" />
                    <input {...register('street')} required onChange={handleFormChange} name="street" value={addressUser.street} type="text" id="street" placeholder="Rua" />
                    <input {...register('number')} required type="number" id="number" placeholder="Número" />
                    <input {...register('complement')} onChange={handleFormChange} name="complement" value={addressUser.complement} type="text" id="complement" placeholder="Complemento" />
                    <label htmlFor="complement">Opcional</label>
                    <input {...register('neighborhood')} required onChange={handleFormChange} name="neighborhood" value={addressUser.neighborhood} type="text" id="neighborhood" placeholder="Bairro" />
                    <input {...register('city')} required onChange={handleFormChange} name="city" value={addressUser.city} type="text" id="city" placeholder="Cidade" />
                    <input {...register('uf')} required onChange={handleFormChange} name="uf" value={addressUser.uf} type="text" id="uf" placeholder="UF" />
                </div>
            </StyledAddressUser>
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
                        <button type="button">
                            <CreditCard size={16} />
                            <span>Cartão de crédito</span>
                        </button>
                    </li>
                    <li onClick={() => handleGetPayFormat('cartão de débito')}>
                        <button type="button">
                            <Bank size={16} />
                            <span>cartão de débito</span>
                        </button>
                    </li>
                    <li onClick={() => handleGetPayFormat('dinheiro')}>
                        <button type="button">
                            <Money size={16} />
                            <span>dinheiro</span>
                        </button>
                    </li>
                </ul>
            </StylesPayFormat>
        </StylesDatasUser>
    );
}
