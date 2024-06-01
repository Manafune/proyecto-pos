import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { AddressCustomer } from '@/types/clients';
import React from 'react';
interface TypeTableContent {
	addressClients: AddressCustomer[];
}

export const TableClientContent = ({ addressClients }: TypeTableContent) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Apellido</TableHead>
					<TableHead className='hidden md:table-cell'>Dni</TableHead>
					<TableHead className='hidden md:table-cell'>Fecha de Nacimiento</TableHead>
					<TableHead className='hidden md:table-cell'>Ciudad</TableHead>
					<TableHead className='hidden md:table-cell'>Departamento</TableHead>
					<TableHead className='hidden md:table-cell'>Calle</TableHead>
					<TableHead>
						<span className='sr-only'>Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{addressClients?.map(({ customer, city, id, state, street }) => (
					<TableRow key={id}>
						{customer?.map((client) => (
							<React.Fragment key={client.id.toString()}>
								<TableCell>{client.first_name}</TableCell>
								<TableCell>{client.last_name}</TableCell>
								<TableCell>{client.dni}</TableCell>
								<TableCell>{client.birth_date}</TableCell>
							</React.Fragment>
						))}
						<TableCell>{city}</TableCell>
						<TableCell>{state}</TableCell>
						<TableCell>{street}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
