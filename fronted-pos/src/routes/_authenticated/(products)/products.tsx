import { SIZE_PAGINATION } from '@/config';
import { getAllProducts, getCountProducts } from '@/lib/products/getProduct';
import { Outlet, createFileRoute } from '@tanstack/react-router';
export type ProductsPagination = {
	pageSize: number;
	current: number;
};
export const Route = createFileRoute('/_authenticated/(products)/products')({
	loader: async ({ deps }) => {
		const { pageSize, current } = deps as ProductsPagination;
		const [data, count] = await Promise.all([getAllProducts({ current, pageSize }), getCountProducts()]);

		return {
			products: data,
			totalProducts: count
		};
	},
	loaderDeps: ({ search: { pageSize, current } }) => ({ pageSize, current }),
	validateSearch: (search: ProductsPagination) => {
		return {
			pageSize: search?.pageSize ?? SIZE_PAGINATION,
			current: search?.current ?? 1
		};
	},
	component: () => <Outlet />
});
