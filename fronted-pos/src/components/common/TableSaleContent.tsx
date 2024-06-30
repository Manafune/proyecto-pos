import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
// import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
// import { Link, useRouter } from '@tanstack/react-router';

import {type DetailSales, SaleStatus} from '@/types/sales';
// import { ProductsPagination } from '@/routes/_authenticated/(products)/products';
interface TypeTableContent {
	detail_sales: DetailSales[]
}

export const TableSaleContent = ({ detail_sales }: TypeTableContent) => {

	const getStatusText = (status: SaleStatus) => (status === SaleStatus.COMPLETED ? 'Completa' : 'Cancelada');
	console.log(detail_sales);
    return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Cliente</TableHead>
					<TableHead>Fecha de Venta</TableHead>
					<TableHead className='hidden md:table-cell'>Total</TableHead>
					<TableHead className='hidden md:table-cell'>Estado</TableHead>
					<TableHead>
						<span className='sr-only'>Acciones</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{detail_sales?.map(({id,sales}) => (
					<TableRow key={id} className={id % 2 === 0 ? '' : 'bg-slate-200/70 hover:bg-slate-200/70'}>
								<TableCell className='hidden md:table-cell'>{sales?.customer.first_name}</TableCell>
								<TableCell className='hidden md:table-cell'>{sales?.sale_date.toString()}</TableCell>
								<TableCell className='hidden md:table-cell'>{sales?.total}</TableCell>
								<TableCell>
									<Badge variant={sales?.status === SaleStatus.COMPLETED ? 'outline' : 'secondary'} className='border-none bg-blue-200'>
										{ sales ? getStatusText(sales.status) : ''}
									</Badge>
								</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button aria-haspopup='true' size='icon' variant='ghost'>
										<MoreHorizontal className='h-4 w-4' />
										<span className='sr-only'>Toggle menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									{/* <DropdownMenuLabel>Acciones</DropdownMenuLabel>
									<Link
										to='/products/$id'
										params={{ id: sale.id.toString() }}
										search={(prev) => {
											const data = prev as ProductsPagination;
											return { ...data };
										}}
									>
										<DropdownMenuItem>Editar</DropdownMenuItem>
									</Link> */}
									{/* <DropdownMenuItem
										onClick={async () => {
											const data = await putProductsByState({
												status: sale.status === MemberStatus.ACTIVE ? MemberStatus.INACTIVE : MemberStatus.ACTIVE,
												idSale: sale.id
											});
											if (data !== undefined) route.invalidate();
										}}
									>
										Cambiar Estado
									</DropdownMenuItem> */}
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};