import { Customer } from '@/types/clients';
import supabase from '@/lib/supabase';

interface ApiResponse {
	data?: Customer[];
	errors?: { message: string; code: string; name: string }[];
}

const addClients = async ({ Clients }: { Clients: Customer }): Promise<ApiResponse> => {
	try {
		const { data, error } = await supabase
			.from('customer')
			.insert({
				dni: Clients.dni,
				last_name: Clients.last_name,
				birth_date: Clients.birth_date,
				first_name: Clients.first_name
			})
			.select();

		if (error) {
			const messageResponse = error.code ? `Se produjo un error (codigo: ${error.code}) al anadir el cliente` : 'Ha ocurrido un error al anadir el cliente';

			const response: ApiResponse = {
				errors: [
					{
						message: messageResponse,
						code: error.code,
						name: 'ErrorCliente'
					}
				]
			};
			return response;
		}

		const response: ApiResponse = { data };
		return response;
	} catch (error) {
		throw new Error('Un error inesperado ocurrio al añadir cliente.');
	}
};
