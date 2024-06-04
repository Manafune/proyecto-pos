import { SIZE_PAGINATION } from '@/config';
import { getAllUsers } from '@/lib/user/getUser';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export interface UsersPagination {
	pageSize: number;
	current: number;
}

export const Route = createFileRoute('/_authenticated/(users)/users')({
	loader: async ({ deps }) => {
		const { pageSize, current } = deps as UsersPagination;
		const users = await getAllUsers({ current, pageSize });
		return {
			users
			//totalUsers: count
		};
	},

	staleTime: 60_000,
	loaderDeps: ({ search: { pageSize, current } }) => ({ pageSize, current }),
	validateSearch: (search: Partial<UsersPagination>) => {
		const validatedSearch: UsersPagination = {
			pageSize: search?.pageSize ?? SIZE_PAGINATION,
			current: search?.current ?? 1
		};

		return validatedSearch;
	},
	component: () => <Outlet />
});
