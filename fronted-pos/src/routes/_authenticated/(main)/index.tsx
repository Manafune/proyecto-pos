import { getRangeSales, getStockProducts } from '@/lib/chart/chart';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/(main)/')({
	staleTime: 36_000,
	loader: async () => {
		const [salesByMonth, stockProducts] = await Promise.all([getRangeSales(new Date().getFullYear()), getStockProducts(5)]);
		return {
			salesByMonth,
			stockProducts
		};
	},

	component: () => <Outlet />
});
