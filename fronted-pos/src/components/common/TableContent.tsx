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
import { type Products } from '@/lib/products/getProduct';
interface TypeTableContent {
	products: Products[];
}
export const TableContent = ({ products }: TypeTableContent) => {
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
				{products?.map((invoice) => (
					<TableRow key={invoice.id}>
						<TableCell className='hidden md:table-cell'>{invoice.name}</TableCell>
						<TableCell className='hidden md:table-cell'>{invoice.container}</TableCell>
						<TableCell className='hidden md:table-cell'>{invoice.price}</TableCell>
						<TableCell className='hidden md:table-cell'>{invoice.stock}</TableCell>
						<TableCell>
							<Badge variant={invoice.status === 'Active' ? 'outline' : 'secondary'}>{invoice.status}</Badge>
						</TableCell>
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
	);
};
