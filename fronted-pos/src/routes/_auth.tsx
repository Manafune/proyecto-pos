	import { createFileRoute, Outlet } from '@tanstack/react-router';
	type ProductSearch = {
		confirm?: boolean;
	};

	export const Route = createFileRoute('/_auth')({
		validateSearch: (search: Record<string, unknown>): ProductSearch => {
			if (!search.confirm) return {};
			return {
				confirm: Boolean(search.confirm),
			};
		},
		component: () => <Outlet />,
	});
