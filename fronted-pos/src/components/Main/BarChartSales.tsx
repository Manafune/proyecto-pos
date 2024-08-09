import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
interface SalesBarChartProps {
	data: {
		monthName: string;
		totalSales: number;
	}[];
}
const builSalesBarChart = (products: SalesBarChartProps['data']) => {
	const salesData: Array<{ name: string; fill: string; total: number }> = [];
	const salesConfig: Record<string, { label: string; color: string }> = {};
	let idx = 0;
	for (const product of products) {
		salesData.push({
			name: product.monthName,
			fill: `hsl(var(--chart-${idx + 1}))`,
			total: product.totalSales
		});
		salesConfig[product.monthName] = { label: product.monthName, color: `hsl(var(--chart-${idx + 1}))` };
		idx++;
	}
	return { salesData, salesConfig };
};
export const SalesBarChart = ({ data }: SalesBarChartProps) => {
	const { salesConfig, salesData } = builSalesBarChart(data);

	return (
		<Card className='grid grid-rows-3'>
			<CardHeader className='row-span-1'>
				<CardTitle>Ventas por Mes - Año 2024</CardTitle>
				<CardDescription>Enero - Diciembre 2024</CardDescription>
			</CardHeader>
			<CardContent className='row-span-2'>
				<ChartContainer config={salesConfig} className='md:col-span-1'>
					<BarChart
						accessibilityLayer
						data={salesData}
						layout='vertical'
						margin={{
							left: 0
						}}
					>
						<CartesianGrid vertical={true} />
						<YAxis
							dataKey='name'
							type='category'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => salesConfig[value as keyof typeof salesConfig]?.label}
						/>
						<XAxis dataKey='total' type='number' hide />
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Bar dataKey='total' layout='vertical' radius={5} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
