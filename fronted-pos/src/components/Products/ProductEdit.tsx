import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	SelectTrigger,
	SelectValue,
	SelectItem,
	SelectContent,
	Select
} from '@/components/ui/select';
import { MemberStatus } from '@/types/members';
import { Link, getRouteApi } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ProductData, getProductById } from '@/lib/products/getProduct';
import {
	Table,
	TableBody,
	TableHeader,
	TableHead,
	TableRow
} from '@/components/ui/table';
import {
	TableRowBody,
	TableRowBodyType
} from '@/components/common/TableRowBody';
const route = getRouteApi('/_authenticated/products/$id');
export const ProductEdit = () => {
	const loaderData = route.useParams();
	const [product, setProduct] = useState<ProductData | null>(null);
	useEffect(() => {
		const getProduct = async () => {
			const product = await getProductById({ id: loaderData.id });
			setProduct(product);
		};
		getProduct();
	}, [loaderData.id]);
	const handleUpdateProduct: TableRowBodyType<ProductData>['updateProduct'] = (
		id,
		updatedProps
	) => {
		setProduct((prevProduct) => {
			if (prevProduct !== null && typeof updatedProps.id === 'number') {
				return { ...prevProduct, ...updatedProps };
			}
			return null;
		});
	};

	return (
		<div className="grid max-w-screen-xl flex-1 auto-rows-max gap-4">
			<div className="grid  flex-1 auto-rows-max gap-4">
				<div className="flex items-center gap-4">
					<Link
						to="/products"
						className={buttonVariants({ variant: 'outline' })}
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Volver</span>
					</Link>
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-4xl font-semibold tracking-tight sm:grow-0">
						{product?.name}
					</h1>
					<Badge variant="outline" className="ml-auto sm:ml-0">
						Disponible
					</Badge>
					<div className="hidden items-center gap-2 md:ml-auto md:flex">
						<Link
							to="/products"
							className={buttonVariants({ variant: 'outline' })}
						>
							Descartar
						</Link>
						<Button size="sm">Guardar Producto</Button>
					</div>
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-6">
				<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6">
					<Card x-chunk="dashboard-07-chunk-0">
						<CardHeader>
							<CardTitle className="text-xl">ACTUALIZAR PRODUCTO</CardTitle>
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
									/>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-07-chunk-1">
						<CardHeader>
							<CardTitle>Stock</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[100px]">Nombre</TableHead>
										<TableHead>Stock</TableHead>
										<TableHead>Precio</TableHead>
										<TableHead className="w-[100px]">Envase</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{product && (
										<TableRowBody
											product={product}
											updateProduct={handleUpdateProduct}
											isTooltip={false}
										/>
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
				<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
					<Card x-chunk="dashboard-07-chunk-3">
						<CardHeader>
							<CardTitle>Estado del Producto</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Select defaultValue={product?.container.toUpperCase()}>
										<SelectTrigger id="status" aria-label="Seleccionar estado">
											<SelectValue placeholder="Seleccionar estado" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value={MemberStatus.ACTIVE}>
												Activo
											</SelectItem>
											<SelectItem value={MemberStatus.INACTIVE}>
												Inactivo
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};
