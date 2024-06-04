import { SIZE_PAGINATION } from '@/config';
import supabase from '@/lib/supabase';
import { getAllUsers } from '@/lib/user/getUser';
import { UserToken } from '@/types/auth';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { jwtDecode } from 'jwt-decode';

export interface UsersPagination {
	pageSize: number;
	current: number;
}

export const Route = createFileRoute('/_authenticated/(users)/users')({
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		console.log(data);
		const user: UserToken = jwtDecode(data.session?.access_token ?? '');
		console.log(user);
		if(user.user_role!=='ADMIN'){
			throw redirect({to:'/'});
		}
	},
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
