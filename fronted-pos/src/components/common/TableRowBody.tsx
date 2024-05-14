import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types/products';
import { type ProductData } from '@/lib/products/getProduct';
export interface TableRowBodyType<T> {
	product: T;
	updateProduct: (id: string | number, updatedProps: Partial<T>) => void;
}

export const TableRowBody = <T extends Product | ProductData>({ product, updateProduct }: TableRowBodyType<T>) => {
	return (
		<TableRow key={`${product.name}-${product.id}`}>
			<TableCell className='font-semibold whitespace-nowrap overflow-hidden capitalize'>
				{product.name.toLowerCase()}
			</TableCell>
			<TableCell>
				<Label htmlFor={`stock-${product.id}`} className='sr-only'>
					Stock
				</Label>
				<Input
					id={`stock-${product.id}`}
					type='number'
					min={1}
					max={10000}
					defaultValue={product.stock}
					onChange={(e) => {
						const newStockValue = Number(e.currentTarget.value);
						updateProduct(product.id, { ...(product as Partial<T>), stock: newStockValue });
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
						updateProduct(product.id, { ...(product as Partial<T>), price: newPriceValue });
					}}
				/>
			</TableCell>
			<TableCell>
				<Select
					defaultValue={product.container.toUpperCase() ?? 'BOLSA'}
					onValueChange={(selectedContainer) => {
						updateProduct(product.id, { ...(product as Partial<T>), container: selectedContainer });
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
		</TableRow>
	);
};
