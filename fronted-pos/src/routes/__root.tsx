import { Toaster } from 'sonner';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
const TanStackRouterDevtools =
	process.env.NODE_ENV === 'production'
		? () => null // Render nothing in production
		: lazy(() =>
				// Lazy load in development
				import('@tanstack/router-devtools').then((res) => ({
					default: res.TanStackRouterDevtools
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
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
