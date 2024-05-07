import supabase from '@/lib/supabase';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (data.session === null) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
	component: () => <Outlet />,
});
