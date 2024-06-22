import { getClientById } from '@/lib/clients/getClient';
import { getRouteApi, useNavigate, Link } from '@tanstack/react-router';
import { CardSteps } from '@/components/Card/CardSteps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { tableHeaders } from '@/data/table';
import { ClientsRowBody } from './ClientsRowBody';
import { ChevronLeft } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { ClientsPagination } from '@/routes/_authenticated/(clients)/clients';
import { useQuery } from '@/hooks/useQuery';
import { updateAddresDetails } from '@/lib/clients/putClients';
import { AddressMemberSchemaType } from '@/lib/validation/client';
import { stepsClient } from '@/data/steps';
import { useCustomerValidation } from '@/hooks/useCustomerValidation';
const route = getRouteApi('/_authenticated/clients/$id');

export const ClientsUpdate = () => {
	const loaderData = route.useParams();
	const navigate = useNavigate({ from: '/clients/' });

	const { data: client, onUpdateData } = useQuery<AddressMemberSchemaType>({
		fetchFunction: getClientById,
		params: { id: loaderData.id }
	});
	const { errors, onValidateClient } = useCustomerValidation({ onUpdateData });

	const handleSubmit = async () => {
		const customer = client?.customer;
		const clientValidate = Object.entries(client ?? {})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([_, value]) => typeof value !== 'object')
			.map(([key, value]) => [`address_${key}`, value]);
		const dataCustomer = Object.fromEntries(Object.entries(customer ?? {}).map(([key, value]) => [`customer_${key}`, value]));
		const transformed = {
			...Object.fromEntries(clientValidate),
			...dataCustomer
		};
		const isError = Object.values(errors).some((error) => error.length > 1);
		const isThruth = client && customer;
		if (isThruth && isError) return;
		const isUploaded = await updateAddresDetails({ ...transformed });
		isUploaded &&
			navigate({
				to: '/clients',
				search: (searchParams) => {
					const prevSearchParams = searchParams as ClientsPagination;
					return { ...prevSearchParams };
				}
			});
	};

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
					<h1 className='flex-1 shrink-0 whitespace-nowrap text-4xl grow font-semibold tracking-tight sm:grow-0'>
						{client?.customer?.first_name ?? ''}
					</h1>
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
					<Button size='sm' onClick={handleSubmit}>
						Guardar Cambios
					</Button>
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
										onChange={(e) => {
											client?.customer !== undefined &&
												onUpdateData({ ...client, customer: { ...client.customer, first_name: e.target.value } });
										}}
										defaultValue={client?.customer?.first_name ?? ''}
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
							<Table className='h-full grid grid-cols-[auto_1fr] grid-rows-[23rem]'>
								<TableHeader>
									<TableRow className='flex flex-col h-full justify-between'>
										{tableHeaders
											.filter((tableHeader) => tableHeader.label !== 'Nombre')
											.map((head) => (
												<TableHead className='hidden md:flex md:items-center' key={head.label}>
													{head.label}
												</TableHead>
											))}
									</TableRow>
								</TableHeader>
								<TableBody className='h-full '>
									{client !== null && <ClientsRowBody customer={client} onUpdateCustomer={onValidateClient} errors={errors} />}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
				<CardSteps steps={stepsClient} title='¿Cómo Actualizar Cliente?' className='w-full' />
			</div>
		</div>
	);
};
