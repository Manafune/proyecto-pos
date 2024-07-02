import supabase from '@/lib/supabase';
import { Container } from '@/types/products';

export const putProductsByState = async ({ status, idProduct }: { status: 'ACTIVE' | 'INACTIVE'; idProduct: number }) => {
	const { data } = await supabase.from('product').update({ status }).eq('id', idProduct).select();
	return data;
};

export const updateProductDetails = async ({
	id,
	name,
	container,
	price,
	stock
}: {
	id: number;
	name: string;
	container?: Container;
	price: number;
	stock: number;
}) => {
	const { data, error } = await supabase.from('product').update({ name, container, price, stock }).eq('id', id).select();

	if (error) {
		console.error('Error al actualizar detalles de producto:', error);
		throw error;
	}

	return data;
};

export const updateProductStock = async ({ idProduct, newStock }: { idProduct: number; newStock: number }) => {
    const { data, error } = await supabase.from('product').update({ stock: newStock }).eq('id', idProduct).select();

    if (error) {
        console.error('Error al actualizar el stock del producto:', error);
        throw error;
    }

    return data;
};