import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAddProducts } from '@/hooks/productsAdd';
export const SelectedAddProduct = () => {
	const {
		products,
		productSelect,
		addProductSelectionToTotal,
		changeProductSelection
	} = useAddProducts();
	return (
		<Card x-chunk="dashboard-07-chunk-0">
			<CardHeader>
				<CardTitle>AÑADIR PRODUCTO</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6 ">
					<Label htmlFor="name">Nombre</Label>
					<div className="relative grid items-center">
						<Input
							id="name"
							type="text"
							className="w-full"
							autoComplete="off"
							placeholder="Ejemplo: Leche"
							value={productSelect.productName}
							onChange={(e) => changeProductSelection(e.target.value)}
						/>
						<Button
							className={cn(
								'absolute bg-[#10b981] hover:bg-[#34d399] inset-[auto_0.25em_auto_auto] h-5/6 z-30',
								{
									'bg-red-500 hover:bg-red-400': products.length >= 10
								}
							)}
							onClick={addProductSelectionToTotal}
						>
							{products.length >= 10
								? 'No Se Puede Añadir Mas Productos'
								: 'Añadir'}
						</Button>
					</div>
					{productSelect?.error && (
						<span className="text-red-500 text-xs">{productSelect.error}</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
