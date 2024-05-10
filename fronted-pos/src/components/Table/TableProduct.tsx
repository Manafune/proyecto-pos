import { Products, getAllProducts } from '@/lib/products/getProduct';
import { useState, useEffect } from 'react';
import { TableContent } from '@/components/common/TableContent';

export const TableProduct = () => {
	const [products, setProducts] = useState<Products[]>([]);

	useEffect(() => {
		const getTotalProducts = async () => {
			const data = await getAllProducts();
			if (data !== null) setProducts(data);
		};
		getTotalProducts();
	}, []);

	return <TableContent products={products} />;
};
