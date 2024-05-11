import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { StockProductTable } from './Stock/StockProductTable';
import { useState } from 'react';
import { type Product } from '@/types/products';
import { StockStepsProducts } from './Stock/StockStepsProducts';
import { z } from 'zod';
import { MemberStatus } from '@/types/members';
const ProductSchema = z.object({
	name: z
		.string()
		.min(4, { message: 'El nombre del producto debe tener al menos 4 caracteres' })
		.max(100, { message: 'El nombre del prod' }),
});

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
		if (validate.success) {
			return setProductAdd({ error: '', productName: dataNameProduct });
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
										placeholder='Ejemplo: Leche'
										value={productAdd?.productName ?? ''}
										onChange={handleChangeInput}
									/>
									<Button
										className='absolute inset-[auto_0.25em_auto_auto] h-5/6 z-30'
										onClick={() => {
											if (productAdd !== null && productAdd.error === '') {
												setProductAdd(null);
												setProducts((products) => [
													...products,
													{
														name: productAdd.productName,
														price: 0,
														status: MemberStatus.ACTIVE,
														stock: 0,
														container: 'Caja',
													},
												]);
											}
										}}
									>
										Añadir
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card x-chunk='dashboard-07-chunk-1'>
						<CardHeader>
							<CardTitle>Stock</CardTitle>
						</CardHeader>
						<CardContent>
							<StockProductTable products={products} />
						</CardContent>
						<CardFooter className='justify-center border-t p-4'>
							<Button size='sm' variant='ghost' className='gap-1'>
								<PlusCircle className='h-3.5 w-3.5' />
								Guardar
							</Button>
						</CardFooter>
					</Card>
				</div>
				<StockStepsProducts />
			</div>
			<div className='flex items-center justify-center gap-2 md:hidden'>
				<Button variant='outline' size='sm'>
					Discard
				</Button>
				<Button size='sm'>Save Product</Button>
			</div>
		</div>
	);
};
