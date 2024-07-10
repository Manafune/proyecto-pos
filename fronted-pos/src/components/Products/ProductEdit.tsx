import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, getRouteApi, useNavigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ProductData, getProductById } from '@/lib/products/getProduct';
import { Table, TableBody, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { TableRowBody, TableRowBodyType } from '@/components/Products/TableRowBody';
import type { ProductsPagination } from '@/routes/_authenticated/(products)/products';
import { useRouter } from '@tanstack/react-router';
import { updateProductDetails } from '@/lib/products/putProducts';
import { toast } from 'sonner';
import { CardSteps } from '../Card/CardSteps';
import { ProductSchema } from '@/lib/validation/product';

const steps = [
	{
		title: 'Paso 1',
		description: 'Elige los datos que quieres cambiar'
	},
	{
		title: 'Paso 2',
		description: 'Asegurate de que los nuevos datos sean correctos'
	},
	{
		title: 'Paso 3',
		description: 'Guarda o descarta los cambios realizados'
	}
];

const route = getRouteApi('/_authenticated/products/$id');

export const ProductEdit = () => {
	const router = useRouter();
	const loaderData = route.useParams();
	const navigate = useNavigate({ from: '/products' });
	const [product, setProduct] = useState<ProductData | null>(null);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const getProduct = async () => {
			const product = await getProductById({ id: loaderData.id });
			setProduct(product);
		};
		getProduct();
	}, [loaderData.id]);

	const onChangeProduct: TableRowBodyType<ProductData>['updateProduct'] = async (_id, updatedProps) => {
		setProduct((prevProduct) => {
			if (prevProduct === null) return null;
			return { ...prevProduct, ...updatedProps };
		});
	};
	const onSubmitData = async () => {
		try {
			if (product === null) return;

			const validationResult = ProductSchema.safeParse({ name: product.name });
			if (!validationResult.success) {
				setError(validationResult.error.errors[0].message); // Set error message
				return;
			}


			await updateProductDetails(product);
			toast.success('El producto se ha modificado con éxito');
			router.invalidate();
			return navigate({
				to: '/products',
				search: (searchParams) => {
					const prevSearchParams = searchParams as ProductsPagination;
					return { ...prevSearchParams };
				}
			});
			
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='grid flex-1 auto-rows-max gap-4'>
			<div className='grid grid-flow-col'>
				<div className='flex flex-row'>
					<Link
						to='/products'
						className={buttonVariants({
							variant: 'outline'
						})}
						search={(searchParams) => {
							const prevSearchParams = searchParams as ProductsPagination;
							return { ...prevSearchParams };
						}}
					>
						<ChevronLeft className='h-4 w-4' />
						<span className='sr-only'>Volver</span>
					</Link>
					<h1 className='flex-1 shrink-0 whitespace-nowrap text-4xl grow font-semibold tracking-tight sm:grow-0'>{product?.name}</h1>
					<Badge variant='outline' className='ml-auto sm:ml-0'>
						Disponible
					</Badge>
				</div>
				<div className='hidden items-center gap-2 md:ml-auto md:flex'>
					<Link
						to='/products'
						className={buttonVariants({
							variant: 'outline'
						})}
						search={(searchParams) => {
							const prevSearchParams = searchParams as ProductsPagination;
							return { ...prevSearchParams };
						}}
					>
						Descartar
					</Link>
					<Button size='sm' onClick={onSubmitData}>
						Guardar Producto
					</Button>
				</div>
			</div>
			<div className='grid gap-4 md:grid-cols-[1fr_auto] lg:grid-cols-3 lg:gap-6'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6'>
					<Card x-chunk='dashboard-07-chunk-0'>
						<CardHeader>
							<CardTitle className='text-xl'>ACTUALIZAR PRODUCTO</CardTitle>
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
										value={product?.name ?? ''}
										onChange={(e) => product !== null && onChangeProduct(product.id, { name: e.target.value })}
									/>
								</div>
								{error && <span className='text-red-500'>{error}</span>}
							</div>
						</CardContent>
					</Card>
					<Card x-chunk='dashboard-07-chunk-1'>
						<CardHeader>
							<CardTitle>Stock</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Stock</TableHead>
										<TableHead>Precio</TableHead>
										<TableHead className='w-[100px]'>Envase</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>{product && <TableRowBody product={product} updateProduct={onChangeProduct} isTooltip={false} />}</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
				<CardSteps steps={steps} title='¿Cómo Actualizar Productos?' className='w-full' />
			</div>
		</div>
	);
};
