import { getAllProducts, getCountProducts } from '@/lib/products/getProduct';
import { Outlet, createFileRoute } from '@tanstack/react-router';
type ProductsPagination = {
	pageSize: number;
	current: number;
};
export const Route = createFileRoute('/_authenticated/(products)/products')({
	loader: async () => {
		const [data, count] = await Promise.all([getAllProducts(), getCountProducts()]);
		const newSearchParams = new URLSearchParams(window.location.href);
		console.log(newSearchParams.get('pageSize'));
		console.log(newSearchParams.get('current'));
		// console.log(params);
		return data;
	},
	validateSearch: (search: ProductsPagination) => {
		return {
			pageSize: search.pageSize ?? 10,
			current: search.current ?? 1
		};
	},
	component: () => <Outlet />
});
