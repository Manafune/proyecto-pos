import { Toaster } from 'sonner';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
const TanStackRouterDevtools =
	process.env.NODE_ENV === 'production'
		? () => null
		: lazy(() =>
				import('@tanstack/router-devtools').then((res) => ({
					default: res.TanStackRouterDevtools
				}))
			);
const RootComponent = () => {
	return (
		<div className='min-h-screen w-full  relative flex-col bg-slate-50'>
			<Outlet />
			<Toaster richColors />
			<div className='fixed '>
				<Suspense>
					<TanStackRouterDevtools position='bottom-right' />
				</Suspense>
			</div>
		</div>
	);
};

export const Route = createRootRoute({
	component: RootComponent
});
