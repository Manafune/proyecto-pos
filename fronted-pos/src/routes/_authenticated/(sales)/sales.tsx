import { Outlet, createFileRoute } from '@tanstack/react-router'
import { getAllSales} from '@/lib/sales/getSales';
import { SIZE_PAGINATION } from '@/config';

export interface SalesPagination {
	pageSize: number;
	current: number;
}

export const Route = createFileRoute('/_authenticated/(sales)/sales')({
	staleTime: 36_000,
	loader: async ({ deps }) => {
		const { pageSize, current } = deps as SalesPagination;
		const [data, count] = await getAllSales({ current, pageSize });
		// console.log(resolve);
		return {
			sales: data,
			totalSales: count
		};
	},

	loaderDeps: ({ search: { pageSize, current } }) => ({ pageSize, current }),
	validateSearch: (search: Partial<SalesPagination>) => {
		const validatedSearch: SalesPagination = {
			pageSize: search?.pageSize ?? SIZE_PAGINATION,
			current: search?.current ?? 1
		};
		return validatedSearch;
	},
	component: () => <Outlet />
})