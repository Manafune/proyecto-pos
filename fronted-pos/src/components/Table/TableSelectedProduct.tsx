import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SalesSummary } from '../Sales/SalesSummary';
import { type ProductsSelected } from '@/reducer/Sales';
import { useSalesStore } from '@/hooks/useSales';
export const TableSelectedProduct = ({ products, total }: { products: ProductsSelected[]; total: number }) => {
	const { onChangeQuantityProducts } = useSalesStore();
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
										onChange={(e) => onChangeQuantityProducts({ id: product.id, quantity: Number(e.target.value) })}
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
