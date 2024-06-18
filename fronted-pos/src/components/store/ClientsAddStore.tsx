import { createContext, useState, ReactNode } from 'react';
import { AddressMemberSchemaType } from '@/lib/validation/client';

interface ClientContextType {
	client: AddressMemberSchemaType;
	onUpdateCustomer: (params: Partial<AddressMemberSchemaType>) => void;
}

export const ClientContext = createContext<ClientContextType | null>(null);

export const ClientsAddStore = ({ children }: { children: ReactNode }) => {
	const [client, setClient] = useState<AddressMemberSchemaType>({
		customer: { dni: '', first_name: '', last_name: '', birth_date: new Date() },
		city: '',
		state: '',
		street: ''
	});
	const onUpdateCustomer = (params: Partial<AddressMemberSchemaType>) => {
		setClient((prevClient) => ({ ...prevClient, ...params }));
	};

	return <ClientContext.Provider value={{ client, onUpdateCustomer }}>{children}</ClientContext.Provider>;
};
