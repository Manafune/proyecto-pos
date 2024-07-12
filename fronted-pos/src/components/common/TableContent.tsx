import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@tanstack/react-router';
import { ProductData } from '@/lib/products/getProduct';
import { MemberStatus } from '@/types/members';
import { ProductsPagination } from '@/routes/_authenticated/(products)/products';
import { putProductsByState } from '@/lib/products/putProducts';
interface TypeTableContent {
	products: ProductData[];
	totalProducts: number;
}

export const TableContent = ({ products }: TypeTableContent) => {
	const route = useRouter();
	const formatPrice = (number: number) => {
		const data = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(number);
		return data;
	};

	const getStatusText = (status: MemberStatus) => (status === MemberStatus.ACTIVE ? 'Activo' : 'Inactivo');

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
						<span className='sr-only'>Acciones</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products?.map((product, index) => (
					<TableRow key={product.id} className={index % 2 === 0 ? '' : 'bg-slate-200/70 hover:bg-slate-200/70'}>
						<TableCell className='hidden md:table-cell'>{product.name}</TableCell>
						<TableCell className='hidden md:table-cell'>{product.container}</TableCell>
						<TableCell className='hidden md:table-cell'>{formatPrice(product.price)}</TableCell>
						<TableCell className='hidden md:table-cell'>{product.stock}</TableCell>
						<TableCell>
							<Badge variant={product.status === MemberStatus.ACTIVE ? 'outline' : 'secondary'} className='border-none bg-blue-200'>
								{getStatusText(product.status)}
							</Badge>
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
									<DropdownMenuLabel>Acciones</DropdownMenuLabel>
									<Link
										to='/products/$id'
										params={{ id: product.id.toString() }}
										search={(prev) => {
											const data = prev as ProductsPagination;
											return { ...data };
										}}
									>
										<DropdownMenuItem className="rounded bg-cyan-300 text-black px-4 py-2 hover:bg-cyan-400 hover:text-black">Editar</DropdownMenuItem>
									</Link>
									<DropdownMenuItem className="rounded mt-2 bg-yellow-300 text-black px-4 py-2 hover:bg-yellow-400 hover:text-black"
										onClick={async () => {
											const data = await putProductsByState({
												status: product.status === MemberStatus.ACTIVE ? MemberStatus.INACTIVE : MemberStatus.ACTIVE,
												idProduct: product.id
											});
											if (data !== undefined) route.invalidate();
										}}
									>
										Cambiar Estado
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
