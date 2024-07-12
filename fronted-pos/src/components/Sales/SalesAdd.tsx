import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ResponseProduct } from '@/types/products';
import { TableSelectedProduct } from '../Table/TableSelectedProduct';
import { SalesList } from './SalesList';
import { useSalesStore } from '@/hooks/useSales';

export type ProductsSelectionType = ResponseProduct & { selected: boolean };
export const SalesAdd = () => {
	const { storeSales, onChangeProductSelected, onChangeDniClient, onSearchClient, onSearchProducts } = useSalesStore();
	const { dniClient, client, productsSelection, productSelected, products } = storeSales;
	const total = products.reduce((prev, acc) => prev + acc.subtotal, 0);
	return (
		<div className='p-4 max-w-7xl mx-auto'>
			<h2 className='text-xl font-bold mb-4'>Ventas</h2>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div>
					<div className='mb-6'>
						<Label htmlFor='dni' className='block text-sm font-medium text-gray-700'>
							Buscar Cliente por DNI
						</Label>
						<div className='mt-1 flex rounded-md shadow-sm'>
							<Input
								type='text'
								name='dni'
								id='dni'
								className='flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300'
								placeholder='Ingrese DNI del cliente'
								onChange={(e) => onChangeDniClient(e.target.value)}
							/>
							<Button type='button' className='rounded-r-md' onClick={onSearchClient}>
								Buscar
							</Button>
						</div>
						{dniClient.error && <span className='text-sm text-red-600'>{dniClient.error}</span>}
					</div>

					<div className='mb-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
						<Label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
							Nombres
							<Input
								type='text'
								name='first-name'
								id='first-name'
								className='mt-1 block w-full sm:text-sm border-gray-300 rounded-md'
								defaultValue={client?.first_name}
								readOnly
							/>
						</Label>

						<Label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
							Apellidos
							<Input
								type='text'
								name='last-name'
								id='last-name'
								defaultValue={client?.last_name}
								className='mt-1 block w-full sm:text-sm border-gray-300 rounded-md'
								readOnly
							/>
						</Label>

						<Label htmlFor='dni' className='block text-sm font-medium text-gray-700'>
							DNI
							<Input
								type='text'
								name='dni'
								id='dni'
								defaultValue={client?.dni}
								className='mt-1 block w-full sm:text-sm border-gray-300 rounded-md'
								readOnly
							/>
						</Label>
					</div>

					<div className={`${productsSelection.length >= 1 ? 'm-0' : 'mb-6'}`}>
						<Label htmlFor='product' className='block text-sm font-medium text-gray-700'>
							Buscar Producto
						</Label>
						<div className='mt-1 flex rounded-md shadow-sm'>
							<Input
								type='text'
								name='product'
								id='product'
								className='flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300'
								placeholder='Ingrese nombre del producto'
								onChange={(e) => onChangeProductSelected({ product: e.target.value })}
							/>
							<Button type='button' className='rounded-r-md' onClick={onSearchProducts}>
								Buscar
							</Button>
						</div>
						{productSelected.error && <span className='text-sm text-red-600'>{productSelected.error}</span>}
					</div>
					<SalesList productsSelection={productsSelection} />
				</div>
				<TableSelectedProduct products={products} total={total} />
			</div>
		</div>
	);
};
