import supabase from '@/lib/supabase';
import { type Product } from '@/types/products';
export interface ProductData extends Omit<Product, 'id'> {
	id: number;
}

export const getAllProducts = async () => {
	const { data: product } = await supabase.from('product').select('*').order('created_at', { ascending: false });
	return product as unknown as ProductData[];
};
export const getAllProductsByState = async ({ state }: { state: 'ACTIVE' | 'INACTIVE' }) => {
	const { data: productsByState } = await supabase.from('product').select('*').eq('status', state);

	return productsByState as unknown as ProductData[];
};
export const getProductById = async ({ id }: { id: string }) => {
	const { data: product } = await supabase.from('product').select('*').eq('id', id);

	return product?.[0] as unknown as ProductData;
};
