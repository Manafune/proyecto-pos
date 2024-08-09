import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponseProduct } from '@/types/products';

interface PieChartStockTypes {
	products: Omit<ResponseProduct, 'id' | 'created_at' | 'status'>[];
}
const buildStockContent = (products: PieChartStockTypes['products']) => {
	const stockData: Array<Pick<ResponseProduct, 'name' | 'stock'> & { fill: string }> = [];
	const stockConfig: Record<string, { label: string; color: string }> = {};
	let idx = 0;
	for (const product of products) {
		stockData.push({
			name: product.name,
			stock: product.stock,
			fill: `hsl(var(--chart-${idx + 1}))`
		});
		stockConfig[product.name] = { label: product.name, color: `hsl(var(--chart-${idx + 1}))` };
		idx++;
	}
	return { stockData, stockConfig };
};
export const PieChartStock = ({ products }: PieChartStockTypes) => {
	const { stockConfig, stockData } = buildStockContent(products);

	return (
		<Card className='flex flex-col md:col-span-2 row-span-1'>
			<CardHeader className='items-center pb-2'>
				<CardTitle>Productos Con Mayor Stock</CardTitle>
				<CardDescription>Relación de productos</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={stockConfig}
					className='mx-auto aspect-square max-h-[20rem] pb-0 [&_.recharts-pie-label-text]:fill-foreground'
				>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie data={stockData} dataKey='stock' label nameKey='name' />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
