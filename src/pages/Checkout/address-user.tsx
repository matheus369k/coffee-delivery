import { useFormContext } from 'react-hook-form';
import { StyledAddressUser } from './styles';
import { MapPin, Pencil } from '@phosphor-icons/react';
import { Button } from '../../components/button';
import type { AddressUser } from './form-user';

interface AddressUserProps {
    hasEditeAddress: boolean;
    handleHasEditeAddress: () => void;
    addressUser: AddressUser;
}

export function AddressUser({
    addressUser,
    handleHasEditeAddress,
    hasEditeAddress,
}: AddressUserProps) {
    const { register } = useFormContext();

    return (
        <StyledAddressUser>
            <div>
                <MapPin size={22} />
                <p>
                    <span>Endereço de Entrega</span>
                    <span>Informe o endereço onde deseja receber seu pedido</span>
                </p>
            </div>
            {!hasEditeAddress && (
                <Button
                    onClick={handleHasEditeAddress}
                    className="pencil-edite-address"
                    title="editar endereço"
                >
                    <Pencil size={22} />
                    Editar
                </Button>
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
                    <p className="cep">{addressUser.cep || '...'}</p>
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
                    <p className="street">{addressUser.street || '...'}</p>
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
                    <p className="number">{addressUser.number || '...'}</p>
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
                    <p className="complement">{addressUser.complement || '...'}</p>
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
                    <p className="neighborhood">{addressUser.neighborhood || '...'}</p>
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
                    <p className="city">{addressUser.city || '...'}</p>
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
                    <p className="uf">{addressUser.uf || '...'}</p>
                )}
            </div>
        </StyledAddressUser>
    );
}
