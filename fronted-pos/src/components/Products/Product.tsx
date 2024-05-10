// import {
// 	DropdownMenu,
// 	DropdownMenuCheckboxItem,
// 	DropdownMenuContent,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';
// import { File, ListFilter, PlusCircle } from 'lucide-react';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { TableProduct } from '../Table/TableProduct';
// import { useState } from 'react';
// import { AddProduct } from '@/components/Products/AddProduct';
// import { getAllProducts } from '@/lib/products/reactProducts';

// export const Product = () => {
// 	const [isAddProduct, setIsAddProduct] = useState(false);
// 	return (
// 		<Tabs defaultValue='all'>
// 			<div className='flex items-center'>
// 				<TabsList>
// 					<TabsTrigger value='all'>Todo</TabsTrigger>
// 					<TabsTrigger value='active'>Activo</TabsTrigger>
// 					<TabsTrigger value='draft'>Inactivo</TabsTrigger>
// 				</TabsList>
// 				<div className='ml-auto flex items-center gap-2'>
// 					<DropdownMenu>
// 						<DropdownMenuTrigger asChild>
// 							<Button variant='outline' size='sm' className='h-8 gap-1'>
// 								<ListFilter className='h-3.5 w-3.5' />
// 								<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Filter</span>
// 							</Button>
// 						</DropdownMenuTrigger>
// 						<DropdownMenuContent align='end'>
// 							<DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
// 							<DropdownMenuSeparator />
// 							<DropdownMenuCheckboxItem checked>Activo</DropdownMenuCheckboxItem>
// 							<DropdownMenuCheckboxItem>Inactivo</DropdownMenuCheckboxItem>
// 						</DropdownMenuContent>
// 					</DropdownMenu>
// 					<Button size='sm' variant='outline' className='h-8 gap-1'>
// 						<File className='h-3.5 w-3.5' />
// 						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Export</span>
// 					</Button>
// 					<Button
// 						size='sm'
// 						className='h-8 gap-1'
// 						onClick={() => {
// 							const products = getAllProducts();
// 							console.log(products);
// 							setIsAddProduct(true);
// 						}}
// 					>
// 						<PlusCircle className='h-3.5 w-3.5' />
// 						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Producto</span>
// 					</Button>
// 				</div>
// 			</div>
// 			<TableProduct />
// 			{isAddProduct && <AddProduct />}
// 		</Tabs>
// 	);
// };
