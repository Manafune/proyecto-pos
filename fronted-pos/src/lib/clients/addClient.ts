import supabase from '@/lib/supabase';
import { AddressMemberSchemaType } from '../validation/client';
export const formatDateString = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(date);
};
export const addClient = async ({ client }: { client: AddressMemberSchemaType }) => {
	try {
		const flattenedClient = {
			dni: client.customer.dni,
			first_name: client.customer.first_name,
			last_name: client.customer.last_name,
			birth_date: formatDateString(client.customer.birth_date.toString()),
			city: client.city,
			state: client.state,
			street: client.street
		};
		const { error } = await supabase.rpc('insert_customer_with_address', flattenedClient);
		if (error) console.error(error);

		return true;
	} catch (error) {
		throw new Error('Un error inesperado ocurrio al añadir cliente.');
	}
};
