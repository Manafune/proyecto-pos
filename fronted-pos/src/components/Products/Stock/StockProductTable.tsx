import { Table, TableBody, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Product } from '@/types/products';
import { TableRowBody, TableRowBodyType } from '@/components/common/TableRowBody';

type StockProductTableProps = {
	products: Product[];
	updateProduct: TableRowBodyType<Product>['updateProduct'];
};

export const StockProductTable: React.FC<StockProductTableProps> = ({ products, updateProduct }) => {
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
					<TableRowBody key={product.id} product={product} updateProduct={updateProduct} />
				))}
			</TableBody>
		</Table>
	);
};