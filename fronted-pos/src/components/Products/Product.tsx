import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { File, ListFilter, PlusCircle } from 'lucide-react';
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
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm' className='h-8 gap-1'>
								<ListFilter className='h-3.5 w-3.5' />
								<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Filter</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked>Activo</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Inactivo</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button size='sm' variant='outline' className='h-8 gap-1'>
						<File className='h-3.5 w-3.5' />
						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Export</span>
					</Button>
					<Link
						className='h-8 gap-1 text-sm bg-black text-white flex flex-row items-center p-[0.5em] rounded-[0.5em]'
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
