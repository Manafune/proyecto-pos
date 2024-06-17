import { ErrorsCustomer } from '@/types/clients';

export const initializeErrors = (): ErrorsCustomer => ({
	birth_date: '',
	city: '',
	dni: '',
	first_name: '',
	last_name: '',
	state: '',
	street: ''
});
