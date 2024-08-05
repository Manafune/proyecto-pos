import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRouteApi } from '@tanstack/react-router';
import { formatSalesChart } from '@/helpers/chart';
import { SalesBarChart } from './BarChartSales';
// Configuración de la API de rutas
const routeApi = getRouteApi('/_authenticated/');

export const MainPage = () => {
	const { salesByMonth } = routeApi.useLoaderData();
	const chartData = formatSalesChart(salesByMonth);

	return (
		<Card className='max-w-[45rem]'>
			<CardHeader>
				<CardTitle>Ventas por Mes - Año 2024</CardTitle>
				<CardDescription>Enero - Diciembre 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<SalesBarChart data={chartData} />
			</CardContent>
		</Card>
	);
};
