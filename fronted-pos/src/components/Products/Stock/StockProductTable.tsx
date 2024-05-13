import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/products';
import { ProductData } from '@/lib/products/getProduct';
type StockProductTableType = {
	products: Product[] | ProductData[];
	updateProduct: (id: string | number, updatedProps: Partial<Product | ProductData>) => void;
};

export const StockProductTable = ({ products, updateProduct }: StockProductTableType) => {
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
				{products.map((product, id) => (
					<TableRow key={`${product.name}-${id}`}>
						<TableCell className='font-semibold whitespace-nowrap overflow-hidden capitalize'>
							{product.name.toLowerCase()}
						</TableCell>
						<TableCell>
							<Label htmlFor={`stock-${id + 1}`} className='sr-only'>
								Stock
							</Label>
							<Input
								id={`stock-${id + 1}`}
								type='number'
								min={1}
								max={10000}
								defaultValue={product.stock}
								onChange={(e) => {
									updateProduct(product.id, { stock: Number(e.currentTarget.value) });
								}}
							/>
						</TableCell>
						<TableCell>
							<Label htmlFor={`price-${id + 1}`} className='sr-only'>
								Precio
							</Label>
							<Input
								id={`price-${id + 1}`}
								min={0.01}
								type='number'
								step={0.01}
								inputMode='decimal'
								defaultValue={product.price}
								onChange={(e) => {
									updateProduct(product.id, { price: Number(e.currentTarget.value) });
								}}
							/>
						</TableCell>
						<TableCell>
							<Select
								defaultValue={product.container.toUpperCase() ?? 'BOLSA'}
								onValueChange={(selectedContainer) => {
									updateProduct(product.id, { container: selectedContainer });
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
				))}
			</TableBody>
		</Table>
	);
};
