import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, getRouteApi } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ProductData, getProductById } from '@/lib/products/getProduct';
import { Table, TableBody, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { TableRowBody, TableRowBodyType } from '@/components/common/TableRowBody';
import type { ProductsPagination } from '@/routes/_authenticated/(products)/products';
import { StockStepsProducts } from './Stock/StockStepsProducts';
import { updateProductDetails } from '@/lib/products/putProducts'; // Asegúrate de importar correctamente

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
    const loaderData = route.useParams();
    const [product, setProduct] = useState<ProductData | null>(null);
    const [name, setName] = useState('');
    const [container, setContainer] = useState<'BOLSA' | 'CAJA' | 'LATA' | 'BOTELLA'>();
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);

    useEffect(() => {
        const getProduct = async () => {
            const product = await getProductById({
                id: loaderData.id
            });
            setProduct(product);
            if (product) {
                setName(product.name);
                setContainer(product.container);
                setPrice(product.price);
                setStock(product.stock);
            }
        };
        getProduct();
    }, [loaderData.id]);

    const handleUpdateProduct: TableRowBodyType<ProductData>['updateProduct'] = (_id, updatedProps) => {
        setProduct((prevProduct) => {
            if (prevProduct !== null && typeof updatedProps.id === 'number') {
                return {
                    ...prevProduct,
                    ...updatedProps
                };
            }
            return null;
        });
    };

    const handleSaveProduct = async () => {
        let updatedProduct = null;
        let alertMessage = '';
    
        if (product) {
            // Validar que el precio y el stock no sean números negativos
            if (price < 0 || stock < 0) {
                alertMessage = 'Error: El precio y el stock deben ser números positivos.';
            } else {
                try {
                    updatedProduct = await updateProductDetails({
                        idProduct: product.id,
                        name,
                        container,
                        price,
                        stock
                    });
                    alertMessage = 'Producto actualizado';
                    // Actualiza el estado del producto con los nuevos datos
                    setProduct(updatedProduct[0]);
                } catch (error) {
                    console.error('Error guardando el producto:', error);
                    alertMessage = 'Error guardando el producto';
                }
            }
        }
    
        // Muestra la alerta según el resultado
        if (alertMessage) {
            // Aquí puedes mostrar la alerta donde desees, por ejemplo:
            alert(alertMessage);
        }
    };          

    return (
        <div className='grid max-w-screen-xl flex-1 auto-rows-max gap-4'>
            <div className='grid flex-1 auto-rows-max gap-4'>
                <div className='flex items-center gap-4'>
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
                    <h1 className='flex-1 shrink-0 whitespace-nowrap text-4xl font-semibold tracking-tight sm:grow-0'>{product?.name}</h1>
                    <Badge variant='outline' className='ml-auto sm:ml-0'>
                        Disponible
                    </Badge>
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
                        <Button size='sm' onClick={handleSaveProduct}>Guardar Producto</Button>
                    </div>
                </div>
            </div>
            <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-6'>
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
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
                                        <TableHead className='w-[100px]'>Nombre</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Precio</TableHead>
                                        <TableHead className='w-[100px]'>Envase</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>{product && <TableRowBody product={product} updateProduct={handleUpdateProduct} isTooltip={false} />}</TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
                    <StockStepsProducts steps={steps} title='¿Cómo Actualizar Productos?' />
                </div>
            </div>
        </div>
    );
};