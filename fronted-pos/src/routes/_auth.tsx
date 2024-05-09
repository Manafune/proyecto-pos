import { createFileRoute, Outlet } from '@tanstack/react-router';
type ProductSearch = {
	addedData?: boolean;
};

export const Route = createFileRoute('/_auth')({
	validateSearch: (search: Record<string, unknown>): ProductSearch => {
		if (!search.addedData) return {};
		return {
			addedData: Boolean(search.addedData),
		};
	},
	component: () => <Outlet />
});
