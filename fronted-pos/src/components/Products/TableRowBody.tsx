import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types/products';
import { type ProductData } from '@/lib/products/getProduct';
import { X } from 'lucide-react';
export interface TableRowBodyType<TypeProduct> {
	product: TypeProduct;
	updateProduct: (id: string | number, updatedProps: Partial<TypeProduct>) => void;
	deleteProduct?: (id: string | number) => void;
	isTooltip?: boolean;
	isName?: boolean;
}

export const TableRowBody = <TypeProduct extends Product | ProductData>({
	product,
	updateProduct,
	deleteProduct,
	isName = false,
	isTooltip = true
}: TableRowBodyType<TypeProduct>) => {
	return (
		<TableRow key={`${product.name}-${product.id}`} className='relative group'>
			{isName && <TableCell>{product.name}</TableCell>}
			<TableCell>
				<Label htmlFor={`stock-${product.id}`} className='sr-only'>
					Stock
				</Label>
				<Input
					id={`stock-${product.id}`}
					type='number'
					min={1}
					max={10000}
					value={product.stock}
					onChange={(e) => {
						const newStockValue = Number(e.currentTarget.value);
						updateProduct(product.id, {
							...(product as Partial<TypeProduct>),
							stock: newStockValue
						});
					}}
				/>
			</TableCell>
			<TableCell>
				<Label htmlFor={`price-${product.id}`} className='sr-only'>
					Precio
				</Label>
				<Input
					id={`price-${product.id}`}
					min={0.01}
					type='number'
					step={0.01}
					inputMode='decimal'
					defaultValue={product.price}
					onChange={(e) => {
						const newPriceValue = Number(e.currentTarget.value);
						updateProduct(product.id, {
							...(product as Partial<TypeProduct>),
							price: newPriceValue
						});
					}}
				/>
			</TableCell>
			<TableCell>
				<Select
					defaultValue={product.container.toUpperCase() ?? 'BOLSA'}
					onValueChange={(selectedContainer) => {
						updateProduct(product.id, {
							...(product as Partial<TypeProduct>),
							container: selectedContainer
						});
					}}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Elige un contenedor' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='BOLSA'>Bolsa</SelectItem>
						<SelectItem value='CAJA'>Caja</SelectItem>
						<SelectItem value='LATA'>Lata</SelectItem>
						<SelectItem value='BOTELLA'>Botella</SelectItem>
					</SelectContent>
				</Select>
			</TableCell>
			{isTooltip && deleteProduct && (
				<td
					className='absolute hidden rounded-full size-[1.2rem] bg-red-500 z-[100] text-white group-hover:grid group-hover:items-center group-hover:justify-center group-hover:inset-[0_0_0_auto] cursor-pointer '
					onClick={() => deleteProduct(product.id)}
				>
					<X className='size-[95%] block' />
				</td>
			)}
		</TableRow>
	);
};
