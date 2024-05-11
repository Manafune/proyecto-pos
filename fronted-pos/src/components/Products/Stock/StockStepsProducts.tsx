import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Switch } from '@/components/ui/switch';

const steps = [
	{
		title: 'Paso 1',
		description: 'Escribir el nombre del producto',
	},
	{
		title: 'Paso 2',
		description: 'Seleccionar el estado del producto',
	},
	{
		title: 'Paso 3',
		description: 'Seleccionar el stock del producto',
	},
	{
		title: 'Paso 4',
		description: 'Seleccionar el precio y envase del producto',
	},
];

type CardProps = React.ComponentProps<typeof Card>;
export const StockStepsProducts = ({ className, ...props }: CardProps) => {
	return (
		<Card className={cn('w-[380px] h-fit ', className)} {...props}>
			<CardHeader>
				<CardTitle>¿Como Añadir Productos?</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-4'>
				{/* <div className=' flex items-center space-x-4 rounded-md border p-4'>
					<BellRing />
					<div className='flex-1 space-y-1'>
						<p className='text-sm font-medium leading-none'>Modifica el estado Producto</p>
						<p className='text-sm text-muted-foreground'>Activo - Inactivo</p>
					</div>
					<Switch />
				</div> */}
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
				<Button className='w-full'>
					<Check className='mr-2 h-4 w-4' />
					Final Guarda Producto 👌
				</Button>
			</CardFooter>
		</Card>
	);
};
