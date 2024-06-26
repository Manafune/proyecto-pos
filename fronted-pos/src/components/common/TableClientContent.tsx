import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { AddressCustomer } from '@/types/clients';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ClientsPagination } from '@/routes/_authenticated/(clients)/clients';
import { tableHeaders } from '@/data/table';
interface TypeTableContent {
	addressClients: AddressCustomer[];
}

export const TableClientContent = ({ addressClients }: TypeTableContent) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{tableHeaders.map((head) => (
						<TableHead className='hidden md:table-cell' key={head.label}>
							{head.label}
						</TableHead>
					))}
					<TableHead>
						<span className='sr-only'>Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{addressClients?.map(({ customer, city, id, state, street }) => (
					<TableRow key={id}>
						{customer?.map((client, idx) => (
							<React.Fragment key={idx}>
								<TableCell>{client.first_name}</TableCell>
								<TableCell>{client.last_name}</TableCell>
								<TableCell>{client.dni}</TableCell>
								<TableCell>{client.birth_date.toString()}</TableCell>
							</React.Fragment>
						))}
						<TableCell>{city}</TableCell>
						<TableCell>{state}</TableCell>
						<TableCell>{street}</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button aria-haspopup='true' size='icon' variant='ghost'>
										<MoreHorizontal className='h-4 w-4' />
										<span className='sr-only'>Toggle menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuLabel>Acciones</DropdownMenuLabel>
									<Link
										to='/clients/$id'
										params={{ id: id.toString() }}
										search={(prev) => {
											const data = prev as ClientsPagination;
											return { ...data };
										}}
									>
										<DropdownMenuItem>Editar</DropdownMenuItem>
									</Link>
									<DropdownMenuItem>Cambiar Estado</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
