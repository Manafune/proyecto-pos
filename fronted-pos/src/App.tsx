import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { useAuth } from './hooks/useAuth';
import { AuthStore } from './components/store/AuthStore';

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	context: {
		auth: undefined!
	}
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
const InnerApp = () => {
	const auth = useAuth();
	return <RouterProvider router={router} context={auth} />;
};
const App = () => {
	return (
		<AuthStore>
			<InnerApp />
		</AuthStore>
	);
};

export default App;
