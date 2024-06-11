import { createContext, useState, ReactNode } from 'react';
import { AddressByCustomer } from '@/types/clients';

interface ClientContextType {
	client: AddressByCustomer;
	onUpdateCustomer: (params: Partial<AddressByCustomer>) => void;
}

export const ClientContext = createContext<ClientContextType | null>(null);

export const ClientsAddStore = ({ children }: { children: ReactNode }) => {
	const [client, setClient] = useState<AddressByCustomer>({
		customer: { dni: '', first_name: '', last_name: '', birth_date: '' },
		city: '',
		state: '',
		street: ''
	});
	const onUpdateCustomer = (params: Partial<AddressByCustomer>) => {
		setClient((prevClient) => ({ ...prevClient, ...params }));
	};

	return <ClientContext.Provider value={{ client, onUpdateCustomer }}>{children}</ClientContext.Provider>;
};
