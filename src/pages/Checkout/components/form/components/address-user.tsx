import { useFormContext } from 'react-hook-form';
import { StyledAddressUser } from '../styles';
import { MapPin, Pencil } from '@phosphor-icons/react';
import { Button } from '../../../../../components/button';
import type { AddressType } from '../index';

export interface AddressUserProps {
    hasEditeAddress: boolean;
    handleHasEditeAddress: () => void;
    address: AddressType;
}

export function AddressUser({ address, handleHasEditeAddress, hasEditeAddress }: AddressUserProps) {
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
                        type="number"
                        defaultValue={address.cep}
                        className="cep"
                        placeholder="CEP"
                    />
                ) : (
                    <p className="cep">{address.cep || '...'}</p>
                )}
                {hasEditeAddress ? (
                    <input
                        {...register('street')}
                        name="street"
                        defaultValue={address.street}
                        type="text"
                        className="street"
                        placeholder="Rua"
                    />
                ) : (
                    <p className="street">{address.street || '...'}</p>
                )}
                {hasEditeAddress ? (
                    <input
                        {...register('number')}
                        defaultValue={address.number}
                        type="number"
                        className="number"
                        placeholder="Número"
                    />
                ) : (
                    <p className="number">{address.number || '...'}</p>
                )}
                {hasEditeAddress ? (
                    <input
                        {...register('complement')}
                        {...(address.complement && { defaultValue: address.complement })}
                        placeholder="Complemento"
                        name="complement"
                        id="complement"
                        className="complement"
                        type="text"
                    />
                ) : (
                    <p className="complement">{address.complement || '...'}</p>
                )}
                <label htmlFor="complement">Opcional</label>
                {hasEditeAddress ? (
                    <input
                        {...register('neighborhood')}
                        defaultValue={address.neighborhood}
                        name="neighborhood"
                        type="text"
                        className="neighborhood"
                        placeholder="Bairro"
                    />
                ) : (
                    <p className="neighborhood">{address.neighborhood || '...'}</p>
                )}
                {hasEditeAddress ? (
                    <input
                        {...register('city')}
                        defaultValue={address.city}
                        name="city"
                        type="text"
                        className="city"
                        placeholder="Cidade"
                    />
                ) : (
                    <p className="city">{address.city || '...'}</p>
                )}
                {hasEditeAddress ? (
                    <input
                        {...register('uf')}
                        defaultValue={address.uf}
                        name="uf"
                        type="text"
                        className="uf"
                        placeholder="UF"
                    />
                ) : (
                    <p className="uf">{address.uf || '...'}</p>
                )}
            </div>
        </StyledAddressUser>
    );
}
