import { ProductEdit } from '@/components/Products/ProductEdit';
import { createLazyFileRoute } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/_authenticated/products/$id')({
	component: () => <ProductEdit />,
});
