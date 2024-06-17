import supabase from '@/lib/supabase';
import { PrefixAddressCustomer } from '@/types/clients';

export const updateAddresDetails = async (content: PrefixAddressCustomer) => {
	const { data, error } = await supabase.rpc('update_customer_and_address', content);
	console.log(data);
	console.log(error);
};
