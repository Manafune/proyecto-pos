import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TableUser } from '@/components/Table/TableUser';
import { Link } from '@tanstack/react-router';
import { UsersPagination } from '@/routes/_authenticated/(users)/users';

export const Users = () => {
	return (
		<Tabs defaultValue='all'>
			<div className='flex items-center'>
				<div className='ml-auto flex items-center gap-2'>
					<Link
						to='/users/add'
						search={(prev) => {
							const data = prev as UsersPagination
							return{ ...data};
						}}
						className='h-8 gap-1 text-sm bg-[#10b981] hover:bg-[#34d399] text-white flex flex-row items-center p-[0.5em] rounded-[0.5em]'
					>
						<PlusCircle className='h-3.5 w-3.5' />
						<span className='sr-only leading-none sm:not-sr-only sm:whitespace-nowrap'>Nuevo Usuario</span>
					</Link>
				</div>
			</div>
			<TabsContent value='all'>
				<TableUser />
			</TabsContent>
		</Tabs>
	);
};
