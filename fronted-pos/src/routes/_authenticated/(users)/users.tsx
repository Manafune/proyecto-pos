import { SIZE_PAGINATION } from '@/config';
import { getAllUsers, getCountUsers } from '@/lib/user/getUser';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export interface UsersPagination {
	pageSize: number;
	current: number;
	filter: 'ALL' | 'ACTIVE' | 'INACTIVE'; // Corregimos la definición de filter
}

export const Route = createFileRoute('/_authenticated/(users)/users')({
	loader: async ({ deps }) => {
		const { pageSize, current } = deps as UsersPagination;
		const [data, count] = await Promise.all([getAllUsers({ current, pageSize }), getCountUsers()]);
		return {
			users: data,
			totalUsers: count
		};
	},

	staleTime: 60_000,
	loaderDeps: ({ search: { pageSize, current, filter } }) => ({ pageSize, current, filter }),
	validateSearch: (search: Partial<UsersPagination>) => {
		const validatedSearch: UsersPagination = {
			pageSize: search?.pageSize ?? SIZE_PAGINATION,
			current: search?.current ?? 1,
			filter: search?.filter ?? 'ALL'
		};

		return validatedSearch;
	},
	component: () => <Outlet />
});
