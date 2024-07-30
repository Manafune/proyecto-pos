import supabase from '@/lib/supabase';
import { PrefixAddressCustomer } from '@/types/clients';


export const updateAddresDetails = async (content: PrefixAddressCustomer) => {
	try {
		const { data, error } = await supabase.rpc('update_customer_and_address', content);
		if (error) throw new Error(error.message);
		console.log(data);
		return true;
	} catch (error) {
		console.error('Error updating customer and address:', error);
		throw error;
	}
};

export const putCustomerByState = async ({ status, idCustomer }: { status: 'ACTIVE' | 'INACTIVE'; idCustomer: number }) => {
	const { data } = await supabase.from('address').update({ status }).eq('id', idCustomer).select();
	return data;
};

