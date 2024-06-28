import supabase from '@/lib/supabase';
import type { AddressCustomer } from '@/types/clients';
import type { AddressMemberSchemaType } from '../validation/client';
export const getAllClients = async ({ current, pageSize }: { current: number; pageSize: number }) => {
	try {
		const pageCurrent = (current - 1) * pageSize;
		const offset = pageCurrent + pageSize - 1;
		const { data, error } = await supabase
			.from('address')
			.select('id,street,city,state,customer(id,first_name,last_name,dni,birth_date)')
			.range(pageCurrent, offset);

		if (error) throw new Error(error.message);
		console.log(data);
		return data as AddressCustomer[];
	} catch (error) {
		console.error('Error fetching products:', error);
		return [];
	}
};
export const getClientById = async ({ id, timeout }: { id: string; timeout: (milliseconds: number) => AbortSignal }) => {
	const { data: client } = await supabase
		.from('address')
		.select('id,street,city,state,customer(id,first_name,last_name,dni,birth_date)')
		.eq('id', id)
		.abortSignal(timeout(3000));
	const address = client?.[0];
	const customer = address?.customer[0];
	const addressCustomer = {
		...address,
		customer: { ...customer, birth_date: new Date(customer?.birth_date ?? '') }
	} as AddressMemberSchemaType;

	return addressCustomer;
};

export const getClientByDNI = async (dni: string) => {
    try {
        const { data, error } = await supabase
            .from('address')
            .select('id,street,city,state,customer(id,first_name,last_name,dni,birth_date)')
            .eq('customer.dni', dni);

        if (error) throw new Error(error.message);
        const address = data?.[0];
        const customer = address?.customer[0];
        const addressCustomer = {
            ...address,
            customer: { ...customer, birth_date: new Date(customer?.birth_date ?? '') }
        } as AddressMemberSchemaType;

        return addressCustomer;
    } catch (error) {
        console.error('Error fetching client by DNI:', error);
        return null;
    }
};