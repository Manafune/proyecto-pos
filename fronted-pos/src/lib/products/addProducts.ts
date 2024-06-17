import { Product } from '@/types/products';
import supabase from '@/lib/supabase';

interface ApiResponse {
	data?: Product[];
	errors?: { message: string; code: string; name: string }[];
}

const errorMessages: { [key: string]: string } = {
	'23505': 'El nombre del producto no puede ser duplicado',
	'23514': 'El Stock y el Precio debe ser mayor a cero'
};

export const addProducts = async ({ products }: { products: Product[] }): Promise<ApiResponse> => {
	try {
		const newProducts = products.map((product) => ({
			name: product.name,
			container: product.container,
			status: product.status,
			stock: product.stock,
			price: product.price
		}));

		const { data, error } = await supabase
			.from('product')
			.insert([...newProducts])
			.select();

		if (error) {
			const messageResponse = errorMessages[error.code] || 'Error desconocido';
			const response: ApiResponse = {
				errors: [
					{
						message: messageResponse,
						code: error.code,
						name: 'ErrorProducto'
					}
				]
			};
			return response;
		}

		return { data };
	} catch (error) {
		throw new Error('Un error inesperado ocurrió al añadir producto.');
	}
};
