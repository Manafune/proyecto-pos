import { getRouteApi } from '@tanstack/react-router';
import { formatSalesChart } from '@/helpers/chart';
import { SalesBarChart } from './BarChartSales';
import { PieChartStock } from './PieChartStock';
// Configuración de la API de rutas
const routeApi = getRouteApi('/_authenticated/');

export const MainPage = () => {
	const { salesByMonth, stockProducts } = routeApi.useLoaderData();
	const chartData = formatSalesChart(salesByMonth);
	return (
		<div className='grid gap-[1em] md:grid-cols-3 md:grid-rows-2'>
			<PieChartStock products={stockProducts} />
			<SalesBarChart data={chartData} />
		</div>
	);
};
