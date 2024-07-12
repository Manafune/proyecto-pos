import { Table, TableBody, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { TableRowBody } from '@/components/Products/TableRowBody';
import { useAddProductsStore } from '@/hooks/useProductsAdd';

export const StockProductTable = () => {
	const { onDeleteProductFromTotal, storeAddProducts, onUpdateProductFromTotal } = useAddProductsStore();

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
				{storeAddProducts.products.map((product) => (
					<TableRowBody
						key={product.id}
						product={product}
						updateProduct={onUpdateProductFromTotal}
						deleteProduct={onDeleteProductFromTotal}
						isName={true}
					/>
				))}
			</TableBody>
		</Table>
	);
};
