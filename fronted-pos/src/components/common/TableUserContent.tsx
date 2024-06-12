import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/user/getUser';
import { MemberStatus, MemberRole } from '@/types/members';

export const TableUserContent = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const usersData = await getAllUsers({ current: 1, pageSize: 10 });
			setUsers(usersData);
		};
		fetchUsers();
	}, []);

	const getRoleText = (role_app: MemberRole) => {
		return role_app === MemberRole.MEMBER
			? 'Miembro'
			: role_app === MemberRole.OTRO_ROL
				? 'Administrador'
				: role_app === MemberRole.SELLER
					? 'Vendedor'
					: 'Almacenero';
	};

	const getStatusText = (status: MemberStatus) => (status === MemberStatus.ACTIVE ? 'Activo' : 'Inactivo');

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
			<TableBody>
				{users?.map((user, index) => (
					<TableRow key={user.member_id} className={index % 2 === 0 ? '' : 'bg-slate-200/70 hover:bg-slate-200/70'}>
						<TableCell>{user.member_name}</TableCell>
						<TableCell>{user.member_lastname}</TableCell>
						<TableCell className='hidden md:table-cell'>{getRoleText(user.member_role_app)}</TableCell>
						<TableCell className='hidden md:table-cell'>
							<Badge variant={user.member_status === MemberStatus.ACTIVE ? 'outline' : 'secondary'} className='border-none bg-blue-200'>
								{getStatusText(user.member_status)}
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
								<DropdownMenuContent align='end' side='bottom' className='p-2 bg-white rounded-md shadow-lg'>
									<DropdownMenuLabel className='px-2 py-1 text-sm font-semibold text-gray-700'>Acciones</DropdownMenuLabel>
									<DropdownMenuItem className='px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md'>Editar</DropdownMenuItem>
									<DropdownMenuItem className='px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md'>Cambiar Estado</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

// BORREN ESTO ES PARA VER SI DE VERDA SE SUBIO MIS CAMBIOS XD