import { AddressType } from '..';
import { api } from '@lib/api';

export interface GetUserAddressPropsType {
    addressId: string;
    handleDisabledEditeAddress: () => void;
    setInUseFormNewAddress: (addressResponse: AddressType) => void;
    setAddress: React.Dispatch<React.SetStateAction<AddressType>>;
}

export function GetUserAddress({
    addressId,
    setAddress,
    setInUseFormNewAddress,
    handleDisabledEditeAddress,
}: GetUserAddressPropsType) {
    api.get(`/user/${addressId}`)
        .then((response) => {
            setAddress((state) => {
                const addressResponse: AddressType = {
                    ...state,
                    ...response.data.address,
                };

                setInUseFormNewAddress(addressResponse);

                return addressResponse;
            });

            handleDisabledEditeAddress();
        })
        .catch((error: Error) => console.log(error.message));
}
