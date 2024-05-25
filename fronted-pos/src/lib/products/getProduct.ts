import supabase from '@/lib/supabase';
import { ProductsPagination } from '@/routes/_authenticated/(products)/products';
import { type Product } from '@/types/products';
export interface ProductData extends Omit<Product, 'id'> {
	id: number;
}

export const getAllProducts = async ({ current, pageSize, filter }: { current: number; pageSize: number; filter: ProductsPagination['filter'] }) => {
	try {
		const pageCurrent = (current - 1) * pageSize;
		const offset = pageCurrent + pageSize - 1;
		let query = supabase.from('product').select('*').order('created_at', { ascending: false }).range(pageCurrent, offset);

		if (filter === 'ACTIVE' || filter === 'INACTIVE') query = query.eq('status', filter);

		const { data, error } = await query;

		if (error) throw new Error(error.message);

		return data as ProductData[];
	} catch (error) {
		console.error('Error fetching products:', error);
		return [];
	}
};
export const getCountProducts = async ({ filter }: { filter: ProductsPagination['filter'] }) => {
	if (filter === 'ALL') {
		const { data } = await supabase.rpc('count_products');
		return data;
	} else if (filter === 'ACTIVE' || filter === 'INACTIVE') {
		const { data } = await supabase.rpc('count_products_by_state', {
			product_status: filter
		});
		return data;
	}
};
export const getAllProductsByState = async ({ state }: { state: 'ACTIVE' | 'INACTIVE' }) => {
	const { data: productsByState } = await supabase.from('product').select('*').eq('status', state);

	return productsByState as unknown as ProductData[];
};
export const getProductById = async ({ id }: { id: string }) => {
	const { data: product } = await supabase.from('product').select('*').eq('id', id);

	return product?.[0] as unknown as ProductData;
};
