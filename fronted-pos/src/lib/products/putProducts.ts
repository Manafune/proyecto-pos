import supabase from '@/lib/supabase';

export const putProductsByState = async ({ status, idProduct }: { status: 'ACTIVE' | 'INACTIVE'; idProduct: number }) => {
	const { data } = await supabase.from('product').update({ status }).eq('id', idProduct).select();
	return data;
};
