import { getClientById } from '@/lib/clients/getClient';
import { AddressCustomer } from '@/types/clients';
import { getRouteApi } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { CardSteps } from '@/components/Card/CardSteps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import { tableHeaders } from '@/data/users/table';
import { ClientsRowBody } from './ClientsRowBody';
import { ChevronLeft } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { ClientsPagination } from '@/routes/_authenticated/(clients)/clients';
import { Link } from '@tanstack/react-router';

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
	const [customer, setCustomer] = useState<AddressCustomer[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const client = customer?.[0];
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
			<div className='grid grid-flow-col'>
				<div className='flex flex-row'>
					<Link
						to='/clients'
						className={buttonVariants({
							variant: 'outline',
							className: 'mr-4'
						})}
						search={(searchParams) => {
							const prevSearchParams = searchParams as ClientsPagination;
							return { ...prevSearchParams };
						}}
					>
						<ChevronLeft className='h-4 w-4' />
						<span className='sr-only'>Volver</span>
					</Link>
					<h1 className='flex-1 shrink-0 whitespace-nowrap text-4xl grow font-semibold tracking-tight sm:grow-0'>{client?.customer?.[0]?.first_name ?? ''}</h1>
				</div>
				<div className='hidden items-center gap-2 md:ml-auto md:flex'>
					<Link
						to='/clients'
						className={buttonVariants({
							variant: 'outline'
						})}
						search={(searchParams) => {
							const prevSearchParams = searchParams as ClientsPagination;
							return { ...prevSearchParams };
						}}
					>
						Descartar
					</Link>
					<Button size='sm'>Guardar Producto</Button>
				</div>
			</div>
			<div className='grid gap-4 md:grid-cols-[1fr_auto] lg:grid-cols-3 lg:gap-6'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6'>
					<Card x-chunk='dashboard-07-chunk-0'>
						<CardHeader>
							<CardTitle className='text-xl'>Actualizar Cliente</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid gap-6 '>
								<div className='relative grid items-center'>
									<Input
										id='name'
										type='text'
										className='w-full'
										autoComplete='off'
										placeholder='Ejemplo: Marcos'
										defaultValue={client?.customer?.[0]?.first_name ?? ''}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card x-chunk='dashboard-07-chunk-1'>
						<CardHeader>
							<CardTitle>Información Personal</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										{tableHeaders
											.filter((tableHeader) => tableHeader.label !== 'Nombre')
											.map((head) => (
												<TableHead className='hidden md:table-cell'>{head.label}</TableHead>
											))}
									</TableRow>
								</TableHeader>
								<TableBody>{client !== undefined && <ClientsRowBody customer={client} />}</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
				<CardSteps steps={steps} title='¿Cómo Actualizar Cliente?' className='w-full' />
			</div>
		</div>
	);
};
