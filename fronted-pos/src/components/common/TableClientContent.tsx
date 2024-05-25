import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ClientData } from '@/lib/clients/getClients';
import { MemberStatus } from '@/types/members';
interface TypeTableContent {
	clients: ClientData[];
}

export const TableClientContent = ({ clients }: TypeTableContent) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Apellido</TableHead>
					<TableHead className='hidden md:table-cell'>Dni</TableHead>
					<TableHead className='hidden md:table-cell'>Fecha de Nacimiento</TableHead>
					<TableHead className='hidden md:table-cell'>Estado</TableHead>
					<TableHead>
						<span className='sr-only'>Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{clients?.map((client) => (
					<TableRow key={client.id}>
						<TableCell className='hidden md:table-cell'>{client.name}</TableCell>
						<TableCell className='hidden md:table-cell'>{client.lastname}</TableCell>
						<TableCell className='hidden md:table-cell'>{client.dni}</TableCell>
						<TableCell className='hidden md:table-cell'>{client.dateofbirth.toString()}</TableCell>
						<TableCell className='hidden md:table-cell'>{client.status}</TableCell>
						<TableCell>
							<Badge variant={client.status === MemberStatus.ACTIVE ? 'outline' : 'secondary'}>{client.status}</Badge>
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
									<DropdownMenuLabel>Acciones</DropdownMenuLabel>
									<DropdownMenuItem>Editar</DropdownMenuItem>
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
