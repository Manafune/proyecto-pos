import supabase from '@/lib/supabase';

export const getAllProducts = async () => {
	const { data: product } = await supabase.from('product').select('*');
	return product;
};
