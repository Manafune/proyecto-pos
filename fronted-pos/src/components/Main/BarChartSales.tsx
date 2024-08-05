import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface SalesBarChartProps {
	data: {
		monthName: string;
		totalSales: number;
	}[];
}

export const SalesBarChart = ({ data }: SalesBarChartProps) => {
	const chartConfig: ChartConfig = {
		totalSales: {
			label: 'Ventas',
			color: 'hsl(var(--chart-1))'
		},
		label: {
			color: 'hsl(var(--background))'
		}
	};

	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={data} layout='vertical' margin={{ right: 16 }}>
				<CartesianGrid horizontal={false} />
				<YAxis
					dataKey='monthName'
					type='category'
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
					hide
				/>
				<XAxis dataKey='totalSales' type='number' hide />
				<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
				<Bar dataKey='totalSales' layout='vertical' fill='var(--color-desktop)' radius={4}>
					<LabelList dataKey='monthName' position='insideLeft' offset={8} className='fill-[--color-label]' fontSize={12} />
					<LabelList dataKey='totalSales' position='right' offset={8} className='fill-foreground' fontSize={12} />
				</Bar>
			</BarChart>
		</ChartContainer>
	);
};
