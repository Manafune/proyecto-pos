import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { StockProductTable } from './Stock/StockProductTable';
import { useState } from 'react';
import { Container, type Product } from '@/types/products';
import { StockStepsProducts } from './Stock/StockStepsProducts';
import { ProductSchema } from '@/lib/validation/addProduct';
import { MemberStatus } from '@/types/members';
import { addProducts } from '@/lib/products/addProducts';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const ProductsAdd = () => {
	const [productAdd, setProductAdd] = useState<{ productName: string; error: string } | null>(null);
	const [products, setProducts] = useState<Product[]>([]);
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const dataNameProduct = e.currentTarget.value;
		const validate = ProductSchema.safeParse({ name: dataNameProduct });
		if (validate.error !== undefined) {
			const dataError = validate.error.errors[0];
			return setProductAdd({ error: dataError.message, productName: dataNameProduct });
		}
		if (validate.success) return setProductAdd({ error: '', productName: dataNameProduct });
	};
	console.log(products);
	const handleSendData = async () => {
		if (products.length <= 0) return;
		const response = await addProducts({ products });
		if (response.errors !== undefined) {
			const error = response.errors[0];
			return toast.error(error.name, { duration: 3000, description: error.message });
		}
		if (response.data !== undefined) {
			setProducts([]);
			return toast.success('se añadio el producto', {
				duration: 1800,
				description: 'productos añadidos exitosamente',
			});
		}
	};
	return (
		<div className='grid max-w-screen-xl flex-1 auto-rows-max gap-4'>
			<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-6'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6'>
					<Card x-chunk='dashboard-07-chunk-0'>
						<CardHeader>
							<CardTitle>AÑADIR PRODUCTO</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid gap-6 '>
								<Label htmlFor='name'>Nombre</Label>
								<div className='relative grid items-center'>
									<Input
										id='name'
										type='text'
										className='w-full'
										autoComplete='off'
										placeholder='Ejemplo: Leche'
										value={productAdd?.productName ?? ''}
										onChange={handleChangeInput}
									/>
									<Button
										className={cn('absolute inset-[auto_0.25em_auto_auto] h-5/6 z-30', {
											'bg-red-500': products.length >= 10,
										})}
										onClick={() => {
											if (products.length >= 10) return;
											if (productAdd !== null && productAdd.error === '') {
												setProductAdd(null);
												setProducts((products) => [
													...products,
													{
														name: productAdd.productName.trim().toUpperCase(),
														price: 0.01,
														status: MemberStatus.ACTIVE,
														stock: 1,
														container: Container.CAJA,
														id: crypto.randomUUID(),
													},
												]);
											}
										}}
									>
										{products.length >= 10 ? 'No Se Puede Añadir Mas Productos' : 'Añadir'}
									</Button>
								</div>
								{productAdd?.error && <span className='text-red-500 text-xs'>{productAdd.error}</span>}
							</div>
						</CardContent>
					</Card>
					<Card x-chunk='dashboard-07-chunk-1'>
						<CardHeader>
							<CardTitle>Stock</CardTitle>
						</CardHeader>
						<CardContent>
							<StockProductTable products={products} onChangeProducts={setProducts} />
						</CardContent>
						<CardFooter className='justify-center border-t p-4'>
							<Button size='sm' variant='ghost' className='gap-1' onClick={handleSendData}>
								<PlusCircle className='h-3.5 w-3.5' />
								Guardar
							</Button>
						</CardFooter>
					</Card>
				</div>
				<StockStepsProducts />
			</div>
		</div>
	);
};
