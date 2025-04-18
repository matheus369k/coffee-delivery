import { StyledAFormAddress } from "../styles";
import { MapPin, Pencil } from "@phosphor-icons/react";
import { Button } from "@components/button";
import { Input } from "./input";
import type { AddressType } from "@pages/Checkout/service/get-user-address";

export interface AddressUserProps {
  hasEditeAddress: boolean;
  handleHasEditeAddress: () => void;
  address: AddressType;
}

export function FormAddress({
  address,
  handleHasEditeAddress,
  hasEditeAddress,
}: AddressUserProps) {
  return (
    <StyledAFormAddress>
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
        <Input
          defaultValue={address.cep}
          placeholder="CEP"
          fieldName="cep"
          type="number"
          readOnly={!hasEditeAddress}
          aria-label="CEP"
        />
        <Input
          defaultValue={address.street}
          fieldName="street"
          placeholder="Rua"
          type="text"
          readOnly={!hasEditeAddress}
          aria-label="street"
        />
        <Input
          defaultValue={address.number}
          placeholder="Número"
          fieldName="number"
          type="number"
          readOnly={!hasEditeAddress}
          aria-label="house number"
        />
        <Input
          {...(address.complement && { defaultValue: address.complement })}
          placeholder="Complemento"
          fieldName="complement"
          type="text"
          readOnly={!hasEditeAddress}
          aria-label="complement"
        />
        <label htmlFor="complement">Opcional</label>
        <Input
          defaultValue={address.neighborhood}
          fieldName="neighborhood"
          placeholder="Bairro"
          type="text"
          readOnly={!hasEditeAddress}
          aria-label="neighborhood"
        />
        <Input
          fieldName="city"
          defaultValue={address.city}
          placeholder="Cidade"
          type="text"
          readOnly={!hasEditeAddress}
          aria-label="city"
        />
        <Input
          defaultValue={address.uf}
          placeholder="UF"
          fieldName="uf"
          type="text"
          readOnly={!hasEditeAddress}
          aria-label="UF"
        />
      </div>
    </StyledAFormAddress>
  );
}
