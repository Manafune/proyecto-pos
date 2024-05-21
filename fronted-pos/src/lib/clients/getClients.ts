import supabase from '@/lib/supabase';
import { type Client } from '@/types/clients';
export interface ClientData extends Omit<Client, 'id'> {
	id: number;
}

export const getAllClients = async () => {
	const { data: client } = await supabase.from('client').select('*');
	return client as unknown as ClientData[];
};
