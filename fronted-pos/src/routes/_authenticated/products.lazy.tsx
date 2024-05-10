import { createLazyFileRoute } from '@tanstack/react-router';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const invoices = [
	{
		id: '1',
		name: 'Bag of rice',
		container: 'Bag of long grain white rice',
		price: 's/.165',
		stock: '200 bolsas',
		status: 'ACTIVO',
	},
];
export const Route = createLazyFileRoute('/_authenticated/products')({
	component: () => (
		<div>
			<Table>
				<TableCaption></TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px] '>ID</TableHead>
						<TableHead>NOMBRE</TableHead>
						<TableHead>CONTENEDOR</TableHead>
						<TableHead>PRECIO</TableHead>
						<TableHead>STOCK</TableHead>
						<TableHead>ESTADO</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invoices.map((invoice) => (
						<TableRow key={invoice.id}>
							<TableCell className='font-medium'>{invoice.id}</TableCell>
							<TableCell className='font-medium'>{invoice.name}</TableCell>
							<TableCell className='font-medium'>{invoice.container}</TableCell>
							<TableCell className='font-medium'>{invoice.price}</TableCell>
							<TableCell className='font-medium'>{invoice.stock}</TableCell>
							<TableCell className='font-medium'>{invoice.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	),
});
