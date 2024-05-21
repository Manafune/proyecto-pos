import { Product } from '@/components/Products/Product';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/(products)/products/')({
	component: () => <Product></Product>,
});
