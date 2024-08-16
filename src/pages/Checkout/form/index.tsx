/* eslint-disable react-hooks/exhaustive-deps */
import { StylesDatasUser } from './styles';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PayFormat } from './pay-format';
import { AddressUser } from './address-user';

export interface AddressType {
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
    const { watch, setValue } = useFormContext();
    const cep: string = watch('cep') || '';

    const [address, setAddress] = useState<AddressType>({
        city: '',
        complement: '',
        neighborhood: '',
        street: '',
        uf: '',
    });

    useEffect(() => {
        const addressId = window.localStorage.getItem('addressId');

        if (!cep && !(cep.length >= 5) && !addressId) {
            return;
        }

        if (addressId && !cep) {
            api.get(`/user/${addressId}`).then((resp) => {
                setAddress((state) => {
                    return {
                        ...state,
                        ...resp.data.address,
                    };
                });
                setHasEditeAddress(false);

                const addressKeys: string[] = Object.keys(resp.data.address);
                const addressValues: string[] = Object.values(resp.data.address);

                addressKeys.forEach((_, index) => {
                    setValue(addressKeys[index], addressValues[index]);
                });
            });

            return;
        }

        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => {
            setAddress((state) => {
                return {
                    ...state,
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

        window.sessionStorage.setItem('editeAddress', 'true');
    }

    return (
        <StylesDatasUser>
            <h3>Complete seu pedido</h3>
            <AddressUser
                address={address}
                handleHasEditeAddress={handleHasEditeAddress}
                hasEditeAddress={hasEditeAddress}
            />

            <PayFormat handleGetPayFormat={handleGetPayFormat} />
        </StylesDatasUser>
    );
}
