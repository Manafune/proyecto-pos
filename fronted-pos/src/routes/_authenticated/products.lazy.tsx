import { Product } from '@/components/Products/Product';
import { createLazyFileRoute } from '@tanstack/react-router';


export const invoices = [
	{
		id: '1',
		name: 'Bag of rice',
		package: 'Bag',
		price: 'S/.165',
		stock: '200 bags',
		status: 'ACTIVE',
	},
];
export const Route = createLazyFileRoute('/_authenticated/products')({
	component: () => (
		<Product />
	),
});
