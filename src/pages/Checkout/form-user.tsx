/* eslint-disable react-hooks/exhaustive-deps */
import { Bank, CreditCard, CurrencyDollar, MapPin, Money, Pencil } from '@phosphor-icons/react';
import { StyledAddressUser, StylesDatasUser, StylesPayFormat } from './styles';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface AddressUser {
    cep?: string;
    street: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    number?: number;
    uf: string;
}

export function FormUser({ setNewPayFormat }: { setNewPayFormat: (payFormat: string) => void }) {
    const [hasEditeAddress, setHasEditeAddress] = useState(true);
    const { register, watch, setValue } = useFormContext();
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
                setAddressUser((state) => {
                    return {
                        ...state,
                        ...resp.data.addressUser,
                    };
                });
                setHasEditeAddress(false);

                const addressKeys: string[] = Object.keys(resp.data.addressUser);
                const addressValues: string[] = Object.values(resp.data.addressUser);

                addressKeys.forEach((_, index) => {
                    setValue(addressKeys[index], addressValues[index]);
                });
            });

            return;
        }

        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => {
            setAddressUser((state) => {
                return {
                    city: resp.data.localidade || state.city,
                    complement: resp.data.complemento || state.complement,
                    neighborhood: resp.data.bairro || state.neighborhood,
                    street: resp.data.logradouro || state.street,
                    uf: resp.data.uf || state.uf,
                };
            });
        });
    }, [cep]);

    function handleGetPayFormat(payForm: string) {
        setNewPayFormat(payForm);
    }

    function handleHasEditeAddress() {
        setHasEditeAddress(true);

        window.localStorage.setItem('editeAddress', 'true');
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
                {!hasEditeAddress && (
                    <button
                        onClick={handleHasEditeAddress}
                        className="pencil-edite-address"
                        type="button"
                        title="editar endereço"
                    >
                        <Pencil size={22} />
                        Editar
                    </button>
                )}
                <div>
                    {hasEditeAddress ? (
                        <input
                            {...register('cep')}
                            autoSave="off"
                            type="number"
                            defaultValue={addressUser.cep}
                            className="cep"
                            placeholder="CEP"
                        />
                    ) : (
                        <p className="cep">{addressUser.cep}</p>
                    )}
                    {hasEditeAddress ? (
                        <input
                            {...register('street')}
                            autoSave="off"
                            name="street"
                            defaultValue={addressUser.street}
                            type="text"
                            className="street"
                            placeholder="Rua"
                        />
                    ) : (
                        <p className="street">{addressUser.street}</p>
                    )}
                    {hasEditeAddress ? (
                        <input
                            {...register('number')}
                            defaultValue={addressUser.number}
                            autoSave="off"
                            type="number"
                            className="number"
                            placeholder="Número"
                        />
                    ) : (
                        <p className="number">{addressUser.number}</p>
                    )}
                    {hasEditeAddress ? (
                        <input
                            {...register('complement')}
                            defaultValue={addressUser.complement || ''}
                            placeholder="Complemento"
                            name="complement"
                            className="complement"
                            autoSave="off"
                            type="text"
                        />
                    ) : (
                        <p className="complement">{addressUser.complement}</p>
                    )}
                    <label htmlFor="complement">Opcional</label>
                    {hasEditeAddress ? (
                        <input
                            {...register('neighborhood')}
                            defaultValue={addressUser.neighborhood}
                            autoSave="off"
                            name="neighborhood"
                            type="text"
                            className="neighborhood"
                            placeholder="Bairro"
                        />
                    ) : (
                        <p className="neighborhood">{addressUser.neighborhood}</p>
                    )}
                    {hasEditeAddress ? (
                        <input
                            {...register('city')}
                            defaultValue={addressUser.city}
                            autoSave="off"
                            name="city"
                            type="text"
                            className="city"
                            placeholder="Cidade"
                        />
                    ) : (
                        <p className="city">{addressUser.city}</p>
                    )}
                    {hasEditeAddress ? (
                        <input
                            {...register('uf')}
                            defaultValue={addressUser.uf}
                            autoSave="off"
                            name="uf"
                            type="text"
                            className="uf"
                            placeholder="UF"
                        />
                    ) : (
                        <p className="uf">{addressUser.uf}</p>
                    )}
                </div>
            </StyledAddressUser>
            <StylesPayFormat>
                <div>
                    <CurrencyDollar size={22} />
                    <p>
                        <span>Pagamento</span>
                        <span>
                            O pagamento é feito na entrega. Escolha a forma que deseja pagar
                        </span>
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
