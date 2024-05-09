
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { invoices } from '@/routes/_authenticated/products.lazy';
export const TableProduct = () => {
  return (
    <div>
        <Table>
				<TableCaption>A list of your recent tickets.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px] '>ID</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Envase</TableHead>
						<TableHead>Precio</TableHead>
						<TableHead>Stock</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invoices.map((invoice) => (
						<TableRow key={invoice.id}>
							<TableCell className='font-medium'>{invoice.id}</TableCell>
							<TableCell className='font-medium'>{invoice.name}</TableCell>
							<TableCell className='font-medium'>{invoice.description}</TableCell>
							<TableCell className='font-medium'>{invoice.price}</TableCell>
							<TableCell className='font-medium'>{invoice.stock}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
  )
}
