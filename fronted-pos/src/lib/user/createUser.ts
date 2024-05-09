import supabase from '@/lib/supabase';

export const createUser = async () => {
	const { error } = await supabase.from('countries').insert({ id: 1, name: 'Denmark' });
	console.log(error);
};
