import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/products';
type StockProductTableType = {
	products: Product[];
};
export const StockProductTable = ({ products }: StockProductTableType) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Nombre</TableHead>
					<TableHead>Stock</TableHead>
					<TableHead>Precio</TableHead>
					<TableHead className='w-[100px]'>Envase</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => (
					<TableRow>
						<TableCell className='font-semibold'>{product.name}</TableCell>
						<TableCell>
							<Label htmlFor='stock-1' className='sr-only'>
								Stock
							</Label>
							<Input id='stock-1' type='number' defaultValue={product.stock} />
						</TableCell>
						<TableCell>
							<Label htmlFor='price-1' className='sr-only'>
								Precio
							</Label>
							<Input id='price-1' type='number' defaultValue={product.price} />
						</TableCell>
						<TableCell>
							<ToggleGroup type='single' defaultValue='s' variant='outline'>
								<ToggleGroupItem value='s'>B</ToggleGroupItem>
								<ToggleGroupItem value='m'>C</ToggleGroupItem>
								<ToggleGroupItem value='l'>L</ToggleGroupItem>
							</ToggleGroup>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
