import { Table, TableRow, TableBody, TableCell, TableHeader, TableCaption, TableHead } from '@/components/ui/table';
import { Products, getAllProducts } from '@/lib/products/getProduct';
import { useEffect, useState } from 'react';

export const Product1 = () => {
	const [products, setProducts] = useState<Products[]>([]);

	useEffect(() => {
		const getTotalProducts = async () => {
			const data = await getAllProducts();
			if (data !== null) setProducts(data);
		};
		getTotalProducts();
	}, []);
	return (
		<Table>
			<TableCaption>LIST OF PRODUCTS</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px] '>ID</TableHead>
					<TableHead>NAME</TableHead>
					<TableHead>DESCRIPTION</TableHead>
					<TableHead>PRICE</TableHead>
					<TableHead>STOCK</TableHead>
					<TableHead>STATUS</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products?.map((invoice) => (
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
	);
};
