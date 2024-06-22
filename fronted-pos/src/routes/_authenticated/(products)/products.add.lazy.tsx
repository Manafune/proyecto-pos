import { ProductsAdd } from '@/components/Products/ProductsAdd';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/(products)/products/add')({
	component: () => <ProductsAdd />
});
