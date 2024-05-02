import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
const RootComponent = () => {
	return (
		<>
			<div className='p-2 flex gap-2 text-lg'>
				<Link
					to='/'
					activeProps={{
						className: 'font-bold',
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>{' '}
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
});
