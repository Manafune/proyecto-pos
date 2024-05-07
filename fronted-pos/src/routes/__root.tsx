import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const RootComponent = () => {
	return (
		<div className='min-h-screen w-full  relative flex-col bg-muted/40 '>
			<Outlet />
			<div className='fixed '>
				<TanStackRouterDevtools position='bottom-right' />
			</div>
		</div>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
});
