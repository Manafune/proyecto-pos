import { getAllProducts } from '@/lib/products/getProduct';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/(products)/products')({
	loader: async () => {
		const data = await getAllProducts();
		return data;
	},
	component: () => <Outlet />
});
