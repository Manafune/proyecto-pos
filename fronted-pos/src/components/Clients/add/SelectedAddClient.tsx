import { Link, useNavigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { ClientsPagination } from '@/routes/_authenticated/(clients)/clients';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddClient } from '@/hooks/clientsAdd';
import { ClientsRowBody } from '@/components/Clients/ClientsRowBody';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { tableHeaders } from '@/data/table';
import { cn } from '@/lib/utils';
import { useCustomerValidation } from '@/hooks/useCustomerValidation';
import { addClient } from '@/lib/clients/addClient';

export const SelectedAddClient = () => {
	const { client, onUpdateCustomer } = useAddClient();
	const navigate = useNavigate({ from: '/clients/' });

	const { errors, onValidateClient } = useCustomerValidation({ onUpdateData: onUpdateCustomer });
	const onSubmitData = async () => {
		const isError = Object.values(errors).some((error) => error.length > 1);
		onValidateClient(client)
		if (isError) return
		await addClient({ client })
		return navigate({
			to: '/clients',
			search: (searchParams) => {
				const prevSearchParams = searchParams as ClientsPagination;
				return { ...prevSearchParams };
			}
		})
	};

	return (
		<div className='grid flex-1 auto-rows-max gap-4'>
			<div className='grid grid-cols-[auto_1fr_15%]'>
				<Link
					to='/clients'
					search={(searchParams) => {
						const prevSearchParams = searchParams as ClientsPagination;
						return { ...prevSearchParams, current: 1, filter: 'ACTIVE' };
					}}
					className={buttonVariants({
						variant: 'outline'
					})}
				>
					<ChevronLeft className='h-4 w-4' />
					<span className='sr-only'>Volver</span>
				</Link>
				<h1 className='flex-1 shrink-0 whitespace-nowrap text-4xl grow font-semibold tracking-tight text-center sm:grow-0'>
					Añadir Cliente
				</h1>
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
			</div>

			<div className='grid gap-4 w-full'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6'>
					<Card x-chunk='dashboard-07-chunk-0'>
						<CardHeader>
							<CardTitle>Nombre</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid gap-6 '>
								<div className='relative grid items-center'>
									<Input
										id='name'
										type='text'
										className={cn('w-full', { 'border-2 border-red-400 focus-visible:ring-red-700': errors.first_name })}
										autoComplete='off'
										placeholder='Ejemplo: Nombre'
										onChange={(e) => {
											client?.customer !== undefined &&
												onValidateClient({ ...client, customer: { ...client.customer, first_name: e.target.value } });
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
						<CardFooter>
							<Button onClick={onSubmitData} className={cn('bg-[#10b981] hover:bg-[#34d399]  h-5/6 [margin-inline:auto]')}>
								Añadir
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};
