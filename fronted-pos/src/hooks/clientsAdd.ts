import { ClientContext } from '@/components/store/ClientsAddStore';
import { useContext } from 'react';

export const useAddClient = () => {
	const context = useContext(ClientContext);
	if (!context) {
		throw new Error('clients must be in Clients add client');
	}
	return context;
};
