import { SIZE_PAGINATION } from '@/config';
import { getAllClients } from '@/lib/clients/getClient';
import { Outlet } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
export interface ClientsPagination {
	pageSize: number;
	current: number;
}
export const Route = createFileRoute('/_authenticated/(clients)/clients')({
	staleTime: 36_000,
	loader: async ({ deps }) => {
		const { pageSize, current } = deps as ClientsPagination;
		const clients = await getAllClients({ current, pageSize });
		// console.log(resolve);
		return {
			clients
			// 	totalClients: count
		};
	},

	loaderDeps: ({ search: { pageSize, current } }) => ({ pageSize, current }),
	validateSearch: (search: Partial<ClientsPagination>) => {
		const validatedSearch: ClientsPagination = {
			pageSize: search?.pageSize ?? SIZE_PAGINATION,
			current: search?.current ?? 1
		};
		return validatedSearch;
	},
	component: () => <Outlet />
});
