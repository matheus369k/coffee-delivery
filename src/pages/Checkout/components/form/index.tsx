/* eslint-disable react-hooks/exhaustive-deps */
import { StylesDatasUser } from './styles';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { PayFormat } from './components/pay-format';
import { AddressUser } from './components/address-user';
import { GetAddressViaCep } from './service/get-viacep';
import { GetUserAddress } from './service/get-user-address';

export interface AddressType {
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
            GetUserAddress({
                addressId,
                setAddress,
                handleDisabledEditeAddress,
                setInUseFormNewAddress,
            });
            return;
        }

        GetAddressViaCep({
            cep,
            setAddress,
            setInUseFormNewAddress,
        });
    }, [cep]);

    function setInUseFormNewAddress(addressResponse: AddressType) {
        const addressKeys: string[] = Object.keys(addressResponse);
        const addressValues: string[] = Object.values(addressResponse);

        addressKeys.forEach((_, index) => {
            setValue(addressKeys[index], addressValues[index]);
        });
    }

    function handleDisabledEditeAddress() {
        setHasEditeAddress(false);
    }

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
