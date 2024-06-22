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
