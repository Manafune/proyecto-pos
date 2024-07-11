import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { ProductsSelection } from '../Sales/SalesAdd';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SalesSummary } from '../Sales/SalesSummary';
export const TableSelectedProduct = ({
	products,
	total,
	onChangeQuantityProduct
}: {
	products: ProductsSelection[];
	total: number;
	onChangeQuantityProduct: (id: number, quantity: number) => void;
}) => {
	return (
		<div className='overflow-x-auto mb-6'>
			{products.length >= 1 && (
				<Table className='min-w-full divide-y divide-gray-200'>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Producto</TableHead>
							<TableHead>Cantidad</TableHead>
							<TableHead>Precio</TableHead>
							<TableHead className='text-right'>Subtotal</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.name}>
								<TableCell className='font-medium text-sm'>{product.name}</TableCell>
								<TableCell>
									<Input
										type='number'
										onChange={(e) => onChangeQuantityProduct(product.id, Number(e.target.value))}
										defaultValue={product.quantity}
										className='w-16'
										step={1}
										min={1}
										max={product.stock}
									/>
								</TableCell>
								<TableCell>${product.price}</TableCell>
								<TableCell className='text-right'>${product.subtotal}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{products.length === 0 && (
				<div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
					<div className='flex flex-col items-center gap-2 text-center p-[1.5em]'>
						<h3 className='text-2xl font-bold tracking-tight'>No tienes Productos</h3>
						<p className='text-sm text-muted-foreground'>Puedes comenzar a generar la venta tan proto como añadas productos</p>
						<Button className='mt-4'>Añadir Producto</Button>
					</div>
				</div>
			)}
			{products.length >= 1 && <SalesSummary total={total} />}
		</div>
	);
};
