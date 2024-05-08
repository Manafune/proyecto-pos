import { createFileRoute, Outlet } from '@tanstack/react-router';
type ProductSearch = {
	confirm?: string;
};

export const Route = createFileRoute('/_auth')({
	validateSearch: (search: Record<string, unknown>): ProductSearch => {
		if (!search.confirm) return {};
		return {
			confirm: String(search.confirm),
		};
	},
	component: () => <Outlet />,
});
