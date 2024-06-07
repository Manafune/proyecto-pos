import { PlusCircle } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { TableClient } from '@/components/Table/TableClient';
import { Link } from '@tanstack/react-router';
import { type ProductsPagination } from '@/routes/_authenticated/(products)/products';

export const Clients = () => {
	return (
		<Tabs defaultValue='all'>
			<div className='flex items-center'>
				<div className='flex gap-1'>
					<Link
						to='/clients'
						search={(searchParams) => {
							const prevSearchParams = searchParams as ProductsPagination;
							return { ...prevSearchParams };
						}}
						className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#a8a29e]'
					>
						Todos
					</Link>
					<Link
						to='/clients'
						search={(searchParams) => {
							const prevSearchParams = searchParams as ProductsPagination;
							return { ...prevSearchParams };
						}}
						className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#a8a29e]'
					>
						Activo
					</Link>
					<Link
						to='/clients'
						search={(searchParams) => {
							const prevSearchParams = searchParams as ProductsPagination;
							return { ...prevSearchParams };
						}}
						className='inline-flex items-center justify-center 
				whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#a8a29e]'
					>
						Inactivo
					</Link>
				</div>
				<div className='ml-auto flex items-center gap-2'>
					<Link className='h-8 gap-1 text-sm bg-[#10b981] hover:bg-[#34d399] text-white flex flex-row items-center p-[0.5em] rounded-[0.5em]'>
						<PlusCircle className='h-3.5 w-3.5' />
						<span className='sr-only leading-none sm:not-sr-only sm:whitespace-nowrap'>Cliente</span>
					</Link>
				</div>
			</div>
			<TableClient />
		</Tabs>
	);
};
