import supabase from '../supabase';
export interface Products {
	id: number;
	name: string;
	container: string;
	price: number;
	stock: number;
	status: string;
}

export const getAllProducts = async () => {
	const { data: product } = await supabase.from('product').select('*');
	return product as unknown as Products[];
};
export const getAllProductsByState = async ({ state }: { state: 'ACTIVE' | 'INACTIVE' }) => {
	const { data: productsByState } = await supabase.from('product').select('*').eq('status', state);
	console.log(productsByState);
	return productsByState as unknown as Products[];
};
