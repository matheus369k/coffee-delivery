import React, { createContext, useState } from 'react';

interface AddressType {
    cep: number;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    city: string;
    uf: string;
}

interface DatasUserType {
    address: AddressType;
    payFormat: string;
}

interface DatasUserContextType {
    dataUserContext: DatasUserType | undefined;
    setNewDataUserContext?: (data: DatasUserType) => void;
}

export const DatasUserContext = createContext<DatasUserContextType>({
    dataUserContext: undefined,
    setNewDataUserContext: undefined,
});

export function ContextProviderDatasUser({ children }: { children: React.ReactNode }) {
    const [dataUserContext, setDataUserContext] = useState<DatasUserType>();

    function setNewDataUserContext(data: DatasUserType) {
        setDataUserContext(data);
    }

    return <DatasUserContext.Provider value={{ dataUserContext, setNewDataUserContext }}>{children}</DatasUserContext.Provider>;
}
