import { createContext, useState, ReactNode } from 'react';
import { AddressCustomer, Customer } from '@/types/clients';

interface ClientContextType {
	client: Omit<Customer, 'id'> & Omit<AddressCustomer, 'id' | 'Customer'>;
	changeClientSelection: (field: string, value: string | Date) => void;
	addClient: () => Promise<string | void>;
}

export const ClientContext = createContext<ClientContextType | null>(null);

export const ClientsAddStore = ({ children }: { children: ReactNode }) => {
	const initialState: ClientContextType['client'] = {
		first_name: '',
		last_name: '',
		dni: '',
		birth_date: '',
		city: '',
		state: '',
		street: ''
	};

	const [client, setClient] = useState(initialState);

	const changeClientSelection = (field: string, value: string | Date) => {
		setClient((prev) => ({
			...prev,
			[field]: field === 'dni' ? (value as string).trim() : value
		}));
	};

	const addClient = async () => {
		const { first_name, last_name, dni, birth_date, city, state, street } = client;

		if (!first_name || !last_name || !dni || !birth_date || !city || !state || !street) {
			return 'Todos los campos son obligatorios';
		}

		if (!/^\d{8}$/.test(dni)) {
			return 'El DNI debe tener 8 dígitos';
		}

		// Agregar lógica para guardar el cliente en la base de datos o en algún otro lugar

		setClient(initialState);
	};

	return <ClientContext.Provider value={{ client, changeClientSelection, addClient }}>{children}</ClientContext.Provider>;
};
