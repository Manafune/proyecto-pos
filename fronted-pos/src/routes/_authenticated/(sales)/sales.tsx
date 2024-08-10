import { Outlet, createFileRoute } from '@tanstack/react-router';
import { getAllSales, getCountSales, SalesParams } from '@/lib/sales/getSales';
import { SIZE_PAGINATION } from '@/config';

export interface SalesPagination {
	pageSize: number;
	current: number;
	filter: SalesParams['filter'];
}

export const Route = createFileRoute('/_authenticated/(sales)/sales')({
	staleTime: 36_000,
	loader: async ({ deps }) => {
		const { pageSize, current, filter } = deps as SalesPagination;
		const [sales, count] = await Promise.all([getAllSales({ current, pageSize }), getCountSales()]);

		return {
			sales,
			totalSales: count
		};
	},

	loaderDeps: ({ search: { pageSize, current, filter } }) => ({ pageSize, current, filter }),
	validateSearch: (search: Partial<SalesPagination>) => {
		const validatedSearch: SalesPagination = {
			pageSize: search?.pageSize ?? SIZE_PAGINATION,
			current: search?.current ?? 1,
			filter: search?.filter ?? 'ALL'
		};
		return validatedSearch;
	},
	component: () => <Outlet />
});
