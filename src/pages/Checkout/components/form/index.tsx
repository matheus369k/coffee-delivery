/* eslint-disable react-hooks/exhaustive-deps */
import { StylesDatasUser } from "./styles";
import { FormPay } from "./form-pay";
import { FormAddress } from "./form-address";
import { useAutoCompleteAddress } from "@pages/Checkout/hooks/use-auto-complete-address";
import { useEffect } from "react";

export function FormUser() {
  const {
    address,
    isValideCep,
    hasEditeAddress,
    autoCompleteAddress,
    handleHasEditeAddress,
    autoCompleteAddressViaCep,
  } = useAutoCompleteAddress();

  useEffect(() => {
    const addressId = window.localStorage.addressId;

    if (isValideCep && hasEditeAddress) {
      autoCompleteAddressViaCep();
    } else if (addressId) {
      autoCompleteAddress(addressId);
    }
  }, [isValideCep]);

  return (
    <StylesDatasUser>
      <h3>Complete seu pedido</h3>
      <FormAddress
        address={address}
        handleHasEditeAddress={handleHasEditeAddress}
        hasEditeAddress={hasEditeAddress}
      />

      <FormPay />
    </StylesDatasUser>
  );
}
