import supabase from '@/lib/supabase';
import { Customer } from '@/types/clients';

export const updateAddresDetails = async ({ id, first_name, last_name, dni, birth_date }: Customer) => {
	const { data, error } = await supabase.rpc();
};
