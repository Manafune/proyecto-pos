import { CardHeader, Card, CardFooter, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { StockProductTable } from '@/components/Products/Stock/StockProductTable';
import { useAddProducts } from '@/hooks/productsAdd';
import { addProducts } from '@/lib/products/addProducts';
import { toast } from 'sonner';

export const CardAddProduct = () => {
	const { products, updateProductFieldToTotal, cleanTotalProducts } = useAddProducts();

	const handleSubmitProducts = async () => {
		if (products.length <= 0) return;
		const response = await addProducts({ products });
		if (response.errors !== undefined) {
			const error = response.errors[0];
			return toast.error(error.name, {
				duration: 3000,
				description: error.message
			});
		}
		if (response.data !== undefined) {
			cleanTotalProducts();
			return toast.success('Se añadio el producto', {
				duration: 1800,
				description: 'productos añadidos exitosamente'
			});
		}
	};
	return (
		<Card x-chunk="dashboard-07-chunk-1">
			<CardHeader>
				<CardTitle>Lista de Productos a Añadir</CardTitle>
			</CardHeader>
			<CardContent>
				<StockProductTable products={products} updateProduct={updateProductFieldToTotal} />
			</CardContent>
			<CardFooter className="justify-center border-t p-4">
				<Button size="sm" variant="ghost" className="gap-1 text-white bg-[#10b981] hover:bg-[#34d399] hover:text-white" onClick={handleSubmitProducts}>
					<PlusCircle className="h-3.5 w-3.5 text-white" />
					Guardar
				</Button>
			</CardFooter>
		</Card>
	);
};
