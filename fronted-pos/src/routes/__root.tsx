import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const RootComponent = () => {
	return (
		<div className='smin-h-screen w-full grid flex-col bg-muted/40 grid-rows-[100svh_0]'>
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
		</div>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
});
