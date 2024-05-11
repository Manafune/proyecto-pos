import { Product } from '@/components/Products/Product';
import { createLazyFileRoute } from '@tanstack/react-router';

export const invoices = [
	{
		id: '1',
		name: 'Bag of rice',
		container: 'Bag of long grain white rice',
		price: 's/.165',
		stock: '200 bags',
		status: 'Activo',
	},
];
export const Route = createLazyFileRoute('/_authenticated/products/')({
	component: () => <Product></Product>,
});
