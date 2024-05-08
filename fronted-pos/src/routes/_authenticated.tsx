import supabase from '@/lib/supabase';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { DesktopNav } from '@/components/Nav/DesktopNav';
import MobileNav from '@/components/Nav/MobileNav';
export const Route = createFileRoute('/_authenticated')({
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (data.session === null) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
	component: () => (
		<>
			<DesktopNav />
			<MobileNav></MobileNav>
			<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
				<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
					<Outlet />
				</div>
			</main>
		</>
	),
});
