import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { MemberStatus, MemberRole, MemberData } from '@/types/members';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TypeTableContent {
	members: MemberData[];
}

export const TableUserContent = ({ members }: TypeTableContent) => {
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

	return (
		<>
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
					{members?.map((member, index) => (
						<TableRow key={member.member_id} className={index % 2 === 0 ? '' : 'bg-slate-200/70 hover:bg-slate-200/70'}>
							<TableCell>{member.member_name}</TableCell>
							<TableCell>{member.member_lastname}</TableCell>
							<TableCell className='hidden md:table-cell'>{getRoleText(member.member_role_app)}</TableCell>
							<TableCell className='hidden md:table-cell'>
								<Badge variant={member.member_status === MemberStatus.ACTIVE ? 'outline' : 'secondary'} className='border-none bg-blue-200'>
									{getStatusText(member.member_status)}
								</Badge>
							</TableCell>
							<TableCell>
								<Link to='/users/$id' params={{ id: member.member_id.toString() }} search={{ pageSize: 10, current: 1, filter: 'ALL' }}>
									<Button size='sm' className='bg-cyan-600 text-white hover:bg-cyan-800'>
										Editar
									</Button>
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
