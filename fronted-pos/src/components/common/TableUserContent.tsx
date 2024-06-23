import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/user/getUser';
import { MemberStatus, MemberRole, MemberData, User } from '@/types/members';
import { Loading } from '../Loader/Loading';

export const TableUserContent = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const usersData: MemberData[] = await getAllUsers({ current: 1, pageSize: 10 });
				console.log('Fetched users data:', usersData); // Log the fetched data
				setUsers(usersData.map(user => ({
					email: '',  // Asumiendo que no tienes esta información disponible
					name: user.member_name,
					lastname: user.member_lastname,
					role_app: user.member_role_app,
					status: user.member_status,
				})));
			} catch (error) {
				console.error('Error fetching users:', error);
				setError('Failed to fetch users');
			} finally {
				setLoading(false);
			}
		};
		fetchUsers();
	}, []);

	const getRoleText = (role_app: MemberRole) => {
		switch (role_app) {
			case MemberRole.MEMBER:
				return 'Miembro';
			case MemberRole.ADMIN:
				return 'Administrador';
			case MemberRole.SELLER:
				return 'Vendedor';
			case MemberRole.STOREKEEPER:
				return 'Almacenero';
			default:
				return '';
		}
	};

	const getStatusText = (status: MemberStatus) => (status === MemberStatus.ACTIVE ? 'Activo' : 'Inactivo');

	if (loading) {
		return <div className="flex items-center justify-center h-screen"> <Loading /> </div>;
	}

	if (error) {
		return <p>{error}</p>;
	}

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
					<TableRow key={user.email || user.name} className={index % 2 === 0 ? '' : 'bg-slate-200/70 hover:bg-slate-200/70'}>
						<TableCell>{user.name}</TableCell>
						<TableCell>{user.lastname}</TableCell>
						<TableCell className='hidden md:table-cell'>{getRoleText(user.role_app)}</TableCell>
						<TableCell className='hidden md:table-cell'>
							<Badge variant={user.status === MemberStatus.ACTIVE ? 'outline' : 'secondary'} className='border-none bg-blue-200'>
								{getStatusText(user.status)}
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
