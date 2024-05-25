import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
interface StepType {
	title: string;
	description: string;
}
type StepTypes = StepType[];

type CardProps = React.ComponentProps<typeof Card> & { steps: StepTypes; title: string };
export const StockStepsProducts = ({ className, steps, title, ...props }: CardProps) => {
	return (
		<Card className={cn('w-[380px] h-fit ', className)} {...props}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<div>
					{steps.map((notification, index) => (
						<div key={index} className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
							<span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
							<div className='space-y-1'>
								<p className='text-sm font-medium leading-none'>{notification.title}</p>
								<p className='text-sm text-muted-foreground'>{notification.description}</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter>
				<Button className='w-full bg-[#f59e0b] text-white hover:bg-[#fcd34d]'>
					<Check className='mr-2 h-4 w-4' />
					Por ultimo da click en Guardar 👌
				</Button>
			</CardFooter>
		</Card>
	);
};
