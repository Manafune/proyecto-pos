import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
export const TableProduct = () => {

    const data = [
		{
			name: 'Laser Lemonade Machine',
			status: 'Draft',
			price: '$499.99',
			totalSales: '25',
			createdAt: '2023-07-12 10:42 AM',
		},
		{
			name: 'Hypernova Headphones',
			status: 'Active',
			price: '$129.99',
			totalSales: '100',
			createdAt: '2023-10-18 03:21 PM',
		},
		{
			name: 'AeroGlow Desk Lamp',
			status: 'Active',
			price: '$39.99',
			totalSales: '50',
			createdAt: '2023-11-29 08:15 AM',
		},
		{
			name: 'TechTonic Energy Drink',
			status: 'Draft',
			price: '$2.99',
			totalSales: '0',
			createdAt: '2023-12-25 11:59 PM',
		},
		{
			name: 'Gamer Gear Pro Controller',
			status: 'Active',
			price: '$59.99',
			totalSales: '75',
			createdAt: '2024-01-01 12:00 AM',
		},
		{
			name: 'Luminous VR Headset',
			status: 'Active',
			price: '$199.99',
			totalSales: '30',
			createdAt: '2024-02-14 02:14 PM',
		},
	];

  return (
<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Envase</TableHead>
					<TableHead className='hidden md:table-cell'>Precio</TableHead>
					<TableHead className='hidden md:table-cell'>Stock</TableHead>
					<TableHead className='hidden md:table-cell'>Estado</TableHead>
					<TableHead>
						<span className='sr-only'>Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{/* Generar filas dinámicamente */}
				{data.map((item, index) => (
					<TableRow key={index}>
						<TableCell className='font-medium'>{item.name}</TableCell>
						<TableCell>
							<Badge variant={item.status === 'Active' ? 'outline' : 'secondary'}>{item.status}</Badge>
						</TableCell>
						<TableCell className='hidden md:table-cell'>{item.price}</TableCell>
						<TableCell className='hidden md:table-cell'>{item.totalSales}</TableCell>
						<TableCell className='hidden md:table-cell'>{item.createdAt}</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button aria-haspopup='true' size='icon' variant='ghost'>
										<MoreHorizontal className='h-4 w-4' />
										<span className='sr-only'>Toggle menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuItem>Edit</DropdownMenuItem>
									<DropdownMenuItem>Delete</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
  )
}
