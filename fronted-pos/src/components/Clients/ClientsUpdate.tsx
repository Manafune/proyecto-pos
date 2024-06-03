import { getClientById } from '@/lib/clients/getClient';
import { AddressCustomer } from '@/types/clients';
import { getRouteApi } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { CardSteps } from '../common/CardSteps';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Table, TableHead, TableHeader, TableRow } from '../ui/table';
import { Label } from '../ui/label';
import { tableHeaders } from '@/data/users/table';

const route = getRouteApi('/_authenticated/clients/$id');
const steps = [
	{
		title: 'Paso 1',
		description: 'Elige los datos que quieres cambiar'
	},
	{
		title: 'Paso 2',
		description: 'Asegurate de que los nuevos datos sean correctos'
	},
	{
		title: 'Paso 3',
		description: 'Guarda o descarta los cambios realizados'
	}
];

export const ClientsUpdate = () => {
	const loaderData = route.useParams();
	const [customer, setCustomer] = useState<AddressCustomer | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const { abort, timeout } = AbortSignal;
		const getDatas = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const customer = await getClientById({ id: loaderData.id, timeout });
				setCustomer(customer);
			} catch (error) {
				if (error instanceof Error && error.name === 'AbortError') setError({ message: 'Error al abortar la carga', name: 'Error en carga' });
			} finally {
				setIsLoading(false);
			}
		};
		getDatas();
		() => {
			abort();
		};
	}, [loaderData.id]);
	return (
		<div className='grid flex-1 auto-rows-max gap-4'>
			<div className='grid gap-4 md:grid-cols-[1fr_auto] lg:grid-cols-3 lg:gap-6'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6'>
					<Card x-chunk='dashboard-07-chunk-0'>
						<CardHeader>
							<CardTitle className='text-xl'>ACTUALIZA CLIENTE</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid gap-6 '>
								<Label htmlFor='name'>Nombre</Label>
								<div className='relative grid items-center'>
									<Input id='name' type='text' className='w-full' autoComplete='off' placeholder='Ejemplo: Marcos' />
								</div>
							</div>
						</CardContent>
					</Card>
					<Card x-chunk='dashboard-07-chunk-1'>
						<CardHeader>
							<CardTitle>Propiedades</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										{tableHeaders.map((head) => (
											<TableHead className='hidden md:table-cell'>{head.label}</TableHead>
										))}
									</TableRow>
								</TableHeader>
								{/* <TableBody>{product && <TableRowBody product={product} updateProduct={onChangeProduct} isTooltip={false} />}</TableBody> */}
							</Table>
						</CardContent>
					</Card>
				</div>
				<CardSteps steps={steps} title='¿Cómo Actualizar Cliente?' className='w-full' />
			</div>
		</div>
	);
};
