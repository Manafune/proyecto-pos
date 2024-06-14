import { Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { ClientsPagination } from '@/routes/_authenticated/(clients)/clients';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddClient } from '@/hooks/clientsAdd';
import { ClientsRowBody } from '@/components/Clients/ClientsRowBody';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { tableHeaders } from '@/data/users/table';
import { cn } from '@/lib/utils';

export const SelectedAddClient = () => {
	const { client, onUpdateCustomer } = useAddClient();
	return (
		<div className='grid flex-1 auto-rows-max gap-4'>
			<div className='grid grid-flow-col'>
				<div className='flex flex-row'>
					<Link
						to='/clients'
						search={(searchParams) => {
							const prevSearchParams = searchParams as ClientsPagination;
							return { ...prevSearchParams, current: 1, filter: 'ACTIVE' };
						}}
						className={buttonVariants({
							variant: 'outline',
							className: 'mr-4'
						})}
					>
						<ChevronLeft className='h-4 w-4' />
						<span className='sr-only'>Volver</span>
					</Link>
					<h1 className='flex-1 shrink-0 whitespace-nowrap text-4xl grow font-semibold tracking-tight sm:grow-0'>Añadir Cliente</h1>
				</div>
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
										className='w-full'
										autoComplete='off'
										placeholder='Ejemplo: Nombre'
										onChange={(e) => {
											client?.customer !== undefined && onUpdateCustomer({ ...client, customer: { ...client.customer, first_name: e.target.value } });
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
								<TableBody className='h-full '>{client !== null && <ClientsRowBody customer={client} onUpdateCustomer={onUpdateCustomer} />}</TableBody>
							</Table>
						</CardContent>
						<CardFooter>
							<Button className={cn('bg-[#10b981] hover:bg-[#34d399]  h-5/6 [margin-inline:auto]')}>Añadir</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};
