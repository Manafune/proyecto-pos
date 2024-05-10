import { ProductsAdd } from '@/components/Products/ProductsAdd';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/products-add')({
	component: () => <ProductsAdd />,
});
