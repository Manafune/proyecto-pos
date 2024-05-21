
import { Button } from '@/components/ui/button';
import { File, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TableProduct, TableProductActive, TableProductInactive } from '@/components/Table';
import { Link } from '@tanstack/react-router';

export const Product = () => {
	return (
		<Tabs defaultValue='all'>
			<div className='flex items-center'>
				<TabsList>
					<TabsTrigger value='all'>Todo</TabsTrigger>
					<TabsTrigger value='active'>Activo</TabsTrigger>
					<TabsTrigger value='inactive'>Inactivo</TabsTrigger>
				</TabsList>
				<div className='ml-auto flex items-center gap-2'>
					<Button size='sm' variant='outline' className='h-8 bg-[#0ea5e9] hover:bg-[#38bdf8] gap-1'>
						<File className='h-3.5 w-3.5 text-white' />
						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap text-white'>Exportar</span>
					</Button>
					<Link
						className='h-8 gap-1 text-sm bg-[#10b981] hover:bg-[#34d399] text-white flex flex-row items-center p-[0.5em] rounded-[0.5em]'
						to='/products/add'
					>
						<PlusCircle className='h-3.5 w-3.5' />
						<span className='sr-only leading-none sm:not-sr-only sm:whitespace-nowrap'>Producto</span>
					</Link>
				</div>
			</div>
			<TabsContent value='all'>
				<TableProduct />
			</TabsContent>
			<TabsContent value='active'>
				<TableProductActive />
			</TabsContent>

			<TabsContent value='inactive'>
				<TableProductInactive />
			</TabsContent>
		</Tabs>
	);
};
