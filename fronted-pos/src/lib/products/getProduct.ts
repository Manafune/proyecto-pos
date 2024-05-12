import supabase from '@/lib/supabase';
export interface Products {
	id: number;
	name: string;
	container: string;
	price: number;
	stock: number;
	status: string;
}
// no
export const getAllProducts = async () => {
	const { data: product } = await supabase.from('product').select('*');
	return product as unknown as Products[];
};
export const getAllProductsByState = async ({ state }: { state: 'ACTIVE' | 'INACTIVE' }) => {
	const { data: productsByState } = await supabase.from('product').select('*').eq('status', state);

	return productsByState as unknown as Products[];
};
export const getProductById = async ({ id }: { id: string }) => {
	const { data: product } = await supabase.from('product').select('*').eq('id', id);

	return product?.[0] as unknown as Products;
};
