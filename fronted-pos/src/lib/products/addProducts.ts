import { Product } from '@/types/products';
import supabase from '@/lib/supabase';

interface ApiResponse {
	data?: Product[];
	errors?: { message: string; code: string; name: string }[];
}

export const addProducts = async ({ products }: { products: Product[] }): Promise<ApiResponse> => {
	try {
		const newProducts = products.map((product) => ({
			name: product.name,
			container: product.container,
			status: product.status,
			stock: product.stock,
			price: product.price,
		}));
		const { data, error } = await supabase
			.from('product')
			.insert([...newProducts])
			.select();

		if (error !== null) {
			const messageResponse = error.code === '23505' ? 'El nombre del producto no puede ser duplicado' : error.message;

			const response: ApiResponse = {
				errors: [
					{
						message: messageResponse,
						code: error.code,
						name: 'ErrorProducto',
					},
				],
			};
			return response;
		}

		const response: ApiResponse = { data };
		return response;
	} catch (error) {
		throw new Error('An unexpected error occurred while adding the product.');
	}
};
