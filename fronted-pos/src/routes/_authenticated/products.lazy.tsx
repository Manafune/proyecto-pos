import { createLazyFileRoute } from '@tanstack/react-router';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const invoices = [
	{
		id: '1',
		name: 'Bag of rice',
		description: 'Bag of long grain white rice',
		price: 's/.165',
		stock: '200 bags',
	},
];
export const Route = createLazyFileRoute('/_authenticated/products')({
	component: () => (
		<div>
			<Table>
				<TableCaption>A list of your recent tickets.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px] '>ID</TableHead>
						<TableHead>NAME</TableHead>
						<TableHead>DESCRIPTION</TableHead>
						<TableHead>PRICE</TableHead>
						<TableHead>STOCK</TableHead>
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
	),
});
