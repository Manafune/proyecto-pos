import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { MoreHorizontal } from 'lucide-react';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';
import { getRouteApi } from '@tanstack/react-router';
import { MemberStatus, MemberRole } from '@/types/members';

const routeApi = getRouteApi('/_authenticated/users');
export const TableUserContent = () => {
	// Render the TableUserContent component with users data
	const { users } = routeApi.useLoaderData();
	const getRoleText = (role_app: MemberRole) => {
		return role_app === MemberRole.MEMBER
			? 'Miembro'
			: role_app === MemberRole.OTRO_ROL
				? 'Adminitrador'
				: role_app === MemberRole.SELLER
					? 'Vendedor '
					: 'Almacenero'; // Aquí puedes ajustar el texto según tu lógica
	};
	const getStatusText = (status: MemberStatus) => (status === MemberStatus.ACTIVE ? 'Activo' : 'Inactivo');
	console.dir(users);
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Apellido</TableHead>
					<TableHead className='hidden md:table-cell'>Rol</TableHead>
					<TableHead className='hidden md:table-cell'>Estado</TableHead>
					<TableHead>
						<span className='sr-only'>Acciones</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			{/* <TableBody>
				{users?.map((user) => (
					<TableRow key={user.id.toString()}>
						<TableCell className='hidden md:table-cell'>{user.name}</TableCell>
						<TableCell className='hidden md:table-cell'>{user.lastname}</TableCell>
						<TableCell className='hidden md:table-cell'>{user.role_app}</TableCell>
						<TableCell className='hidden md:table-cell'>{user.status}</TableCell>
						<TableCell>
							<Badge variant={user.role_app === MemberRole.MEMBER ? 'outline' : 'secondary'}>{user.role_app}</Badge>
							{getRoleText(user.role_app)}
						</TableCell>
						<TableCell>
							<Badge variant={user.status === MemberStatus.ACTIVE ? 'outline' : 'secondary'}>{user.status}</Badge>
							{getStatusText(user.status)}
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
									<DropdownMenuItem>Cambiar Rol</DropdownMenuItem>
									<DropdownMenuItem>Cambiar Estado</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody> */}
		</Table>
	);
};
