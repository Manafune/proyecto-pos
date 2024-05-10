import { useState, useEffect } from 'react';
import { TableContent } from '@/components/common/TableContent';
import { getAllProductsByState, type Products } from '@/lib/products/getProduct';

export const TableProductInactive = () => {
	const [products, setProducts] = useState<Products[]>([]);

	useEffect(() => {
		const getTotalProducts = async () => {
			const data = await getAllProductsByState({ state: 'INACTIVE' });
			if (data !== null) setProducts(data);
		};
		getTotalProducts();
	}, []);

	return <TableContent products={products} />;
};
