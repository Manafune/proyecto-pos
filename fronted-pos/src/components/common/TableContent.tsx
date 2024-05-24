import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ProductData } from '@/lib/products/getProduct';
import { MemberStatus } from '@/types/members';
import { ProductsPagination } from '@/routes/_authenticated/(products)/products';
interface TypeTableContent {
	products: ProductData[];
	totalProducts: number;
}
export const TableContent = ({ products }: TypeTableContent) => {
	const formatPrice = (number: number) => {
		const data = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(number);
		return data;
	};
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
				{products?.map((product) => (
					<TableRow key={product.id}>
						<TableCell className='hidden md:table-cell'>{product.name}</TableCell>
						<TableCell className='hidden md:table-cell'>{product.container}</TableCell>
						<TableCell className='hidden md:table-cell'>{formatPrice(product.price)}</TableCell>
						<TableCell className='hidden md:table-cell'>{product.stock}</TableCell>
						<TableCell>
							<Badge variant={product.status === MemberStatus.ACTIVE ? 'outline' : 'secondary'}>{product.status}</Badge>
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
									<DropdownMenuLabel>Acciónes</DropdownMenuLabel>
									<Link
										to='/products/$id'
										params={{ id: product.id.toString() }}
										search={(prev) => {
											const data = prev as ProductsPagination;
											return { ...data };
										}}
									>
										<DropdownMenuItem>Editar</DropdownMenuItem>
									</Link>
									<DropdownMenuItem>Cambiar Estado</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
