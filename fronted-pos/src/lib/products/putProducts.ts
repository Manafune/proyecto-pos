import supabase from '@/lib/supabase';

export const putProductsByState = async ({ status, idProduct }: { status: 'ACTIVE' | 'INACTIVE'; idProduct: number }) => {
	const { data } = await supabase.from('product').update({ status }).eq('id', idProduct).select();
	return data;
};

export const updateProductDetails = async ({
	idProduct,
	name,
	container,
	price,
	stock
}: {
	idProduct: number,
	name: string,
	container?: 'BOLSA' | 'CAJA' | 'LATA' | 'BOTELLA',
	price: number,
	stock: number
}) => {
	const { data, error } = await supabase
		.from('product')
		.update({ name, container, price, stock })
		.eq('id', idProduct)
		.select();

	if (error) {
		console.error('Error updating product details:', error);
		throw error;
	}

	return data;
};
