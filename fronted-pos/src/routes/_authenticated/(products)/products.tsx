import { SIZE_PAGINATION } from '@/config';
import { getAllProducts, getCountProducts } from '@/lib/products/getProduct';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export interface ProductsPagination {
	pageSize: number;
	current: number;
	filter: 'ALL' | 'ACTIVE' | 'INACTIVE'; // Corregimos la definición de filter
}

export const Route = createFileRoute('/_authenticated/(products)/products')({
	loader: async ({ deps }) => {
		const { pageSize, current, filter } = deps as ProductsPagination;
		const [data, count] = await Promise.all([getAllProducts({ current, pageSize, filter }), getCountProducts({ filter })]);

		return {
			products: data,
			totalProducts: count
		};
	},

	staleTime: 60_000,
	loaderDeps: ({ search: { pageSize, current, filter } }) => ({ pageSize, current, filter }),
	validateSearch: (search: Partial<ProductsPagination>) => {
		const validatedSearch: ProductsPagination = {
			pageSize: search?.pageSize ?? SIZE_PAGINATION,
			current: search?.current ?? 1,
			filter: search?.filter ?? 'ALL'
		};

		return validatedSearch;
	},
	component: () => <Outlet />
});
