import supabase from '@/lib/supabase';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { DesktopNav } from '@/components/Nav/DesktopNav';
import MobileNav from '@/components/Nav/MobileNav';
import { jwtDecode } from 'jwt-decode';
import type { UserToken } from '@/types/auth';
export const Route = createFileRoute('/_authenticated')({
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		const user: UserToken = jwtDecode(data.session?.access_token ?? '');

		if (data.session === null) {
			throw redirect({
				to: '/sign-in'
			});
		} else {
			const { user_status } = user;
			if (user_status === 'INACTIVE') {
				throw redirect({
					to: '/sign-up'
				});
			}
		}
	},

	component: () => (
		<>
			<DesktopNav />
			<MobileNav></MobileNav>
			<main className='grid flex-1 items-start overflow-x-hidden gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
				<div className='flex  overflow-x-scroll flex-col sm:gap-4 sm:pt-4 sm:pl-14'>
					<Outlet />
				</div>
			</main>
		</>
	)
});
