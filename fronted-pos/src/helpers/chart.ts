// src/helpers/salesDataHelpers.ts
import { type SaleMonth } from '@/lib/chart/chart';

export const formatSalesChart = (data: SaleMonth[]) => {
	const locale = 'es-ES';
	const year = new Date().getFullYear();
	const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });

	return data.map((saleMonth) => {
		const date = new Date(year, parseInt(saleMonth.month, 10) - 1, 1);
		const formattedMonth = monthFormatter.format(date);
		return {
			monthName: formattedMonth,
			totalSales: saleMonth.sales_count
		};
	});
};
