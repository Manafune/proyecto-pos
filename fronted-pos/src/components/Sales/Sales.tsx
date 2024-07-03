import { PlusCircle, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Link } from '@tanstack/react-router';
import { type SalesPagination } from '@/routes/_authenticated/(sales)/sales';
import { TableSale } from '../Table/TableSale';



export const Sales = () => {
  return (
		<Tabs defaultValue='all'>
			<div className='flex items-center'>
				<div className='ml-auto flex items-center gap-2'>
					<Button size='sm' variant='outline' className='h-8 bg-[#0ea5e9] hover:bg-[#38bdf8] gap-1'>
						<File className='h-3.5 w-3.5 text-white' />
						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap text-white'>Exportar</span>
					</Button>
					<Link
						className='h-8 gap-1 text-sm bg-[#10b981] hover:bg-[#34d399] text-white flex flex-row items-center p-[0.5em] rounded-[0.5em]'
						to='/sales/add'
						search={(prev) => {
							const data = prev as SalesPagination;
							return { ...data };
						}}
					>
						<PlusCircle className='h-3.5 w-3.5' />
						<span className='sr-only leading-none sm:not-sr-only sm:whitespace-nowrap'>Nueva Venta</span>
					</Link>
				</div>
			</div>
			<TableSale />
		</Tabs>
  )
}
