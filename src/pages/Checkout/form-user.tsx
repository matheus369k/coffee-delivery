/* eslint-disable react-hooks/exhaustive-deps */
import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from '@phosphor-icons/react';
import { StyledAddressUser, StylesDatasUser, StylesPayFormat } from './styles';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface AddressUser {
    cep?: string;
    street: string;
    complement: string;
    neighborhood: string;
    city: string;
    number?: number;
    uf: string;
}

export function FormUser({ setNewPayFormat }: { setNewPayFormat: (payFormat: string) => void }) {
    const [hasEditeAddress, setHasEditeAddress] = useState(true);
    const { register, watch } = useFormContext();
    const cep: string = watch('cep') || '';

    const [addressUser, setAddressUser] = useState<AddressUser>({
        city: '',
        complement: '',
        neighborhood: '',
        street: '',
        uf: '',
    });

    useEffect(() => {
        const registerId = window.localStorage.getItem('registerId');

        if (!cep && !(cep.length >= 5) && !registerId) {
            return;
        }

        if (registerId && !cep) {
            api.get(`/user/${registerId}`).then((resp) => {
                setAddressUser({ ...resp.data.addressUser });
                setHasEditeAddress(false);
            });

            return;
        }

        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => {
            setAddressUser({
                city: resp.data.localidade,
                complement: resp.data.complemento,
                neighborhood: resp.data.bairro,
                street: resp.data.logradouro,
                uf: resp.data.uf,
            });
        });
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
                    <input
                        {...register('cep', { value: cep || addressUser.cep, onChange: handleFormChange })}
                        data-edite-address={hasEditeAddress}
                        /* readOnly={!hasEditeAddress} */
                        value={addressUser.cep}
                        autoSave="off"
                        type="number"
                        id="cep"
                        placeholder="CEP"
                    />
                    <input
                        {...register('street', { value: addressUser.street, onChange: handleFormChange })}
                        data-edite-address={hasEditeAddress}
                        /* readOnly={!hasEditeAddress} */
                        autoSave="off"
                        name="street"
                        value={addressUser.street}
                        type="text"
                        id="street"
                        placeholder="Rua"
                    />
                    <input
                        {...register('number', { value: addressUser.number || '', onChange: handleFormChange })}
                        data-edite-address={hasEditeAddress}
                        /* readOnly={!hasEditeAddress} */
                        autoSave="off"
                        {...(addressUser.number && { value: addressUser.number })}
                        type="number"
                        id="number"
                        placeholder="Número"
                    />
                    <input
                        {...register('complement', { value: addressUser.complement, onChange: handleFormChange })}
                        data-edite-address={hasEditeAddress}
                        autoSave="off"
                        /* readOnly={!hasEditeAddress} */
                        name="complement"
                        value={addressUser.complement}
                        type="text"
                        id="complement"
                        placeholder="Complemento"
                    />
                    <label htmlFor="complement">Opcional</label>
                    <input
                        {...register('neighborhood', { value: addressUser.neighborhood, onChange: handleFormChange })}
                        data-edite-address={hasEditeAddress}
                        autoSave="off"
                        /* readOnly={!hasEditeAddress} */
                        name="neighborhood"
                        value={addressUser.neighborhood}
                        type="text"
                        id="neighborhood"
                        placeholder="Bairro"
                    />
                    <input
                        {...register('city', { value: addressUser.city, onChange: handleFormChange })}
                        data-edite-address={hasEditeAddress}
                        /* readOnly={!hasEditeAddress} */
                        autoSave="off"
                        name="city"
                        value={addressUser.city}
                        type="text"
                        id="city"
                        placeholder="Cidade"
                    />
                    <input
                        {...register('uf', { value: addressUser.uf, onChange: handleFormChange })}
                        data-edite-address={hasEditeAddress}
                        /* readOnly={!hasEditeAddress} */
                        autoSave="off"
                        name="uf"
                        value={addressUser.uf}
                        type="text"
                        id="uf"
                        placeholder="UF"
                    />
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
        </StylesDatasUser>
    );
}
