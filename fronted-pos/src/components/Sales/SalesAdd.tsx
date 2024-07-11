import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getClientByDNI } from '@/lib/clients/getClient';
import { Customer } from '@/types/clients';
import { toast } from 'sonner';
import { ValidateSalesDni, ValidateSalesName } from '@/lib/validation/sale';
import { getProductsByName } from '@/lib/products/getProduct';
import { ResponseProduct } from '@/types/products';
import { TableSelectedProduct } from '../Table/TableSelectedProduct';
import { cn } from '@/lib/utils';

export interface ProductsSelection {
	name: string;
	quantity: number;
	price: number;
	subtotal: number;
	id: number;
	stock: number;
}
type ProductsSelectionType = ResponseProduct & { selected: boolean };
export const SalesAdd = () => {
	const [dniClient, setDniClient] = useState({ value: '', error: '' });
	const [client, setClient] = useState<Omit<Customer, 'birth_date'> | null>(null);
	const [productSelected, setProductSelected] = useState({ value: '', error: '' });
	const [productsSelection, setProductsSelection] = useState<ProductsSelectionType[]>([]);
	const [products, setProducts] = useState<ProductsSelection[]>([]);

	const total = products.reduce((sum, product) => sum + product.subtotal, 0);
	const handleAddProduct = (id: number) => {
		const productFind = productsSelection.find((product) => product.id === id);
		if (!productFind || productFind.selected === true) return;
		const productToAdd = {
			name: productFind.name,
			quantity: 1,
			price: productFind.price,
			id: productFind.id,
			subtotal: 1 * productFind.price,
			stock: productFind.stock
		};
		const newProduct = productsSelection.map((product) => {
			if (product.id === productFind?.id) return { ...product, selected: true };
			return product;
		});
		setProductsSelection(newProduct);
		setProducts((prevProducts) => [...prevProducts, productToAdd]);
	};
	const handleChangeQuantityProduct = (id: number, quantity: number) => {
		const productFind = productsSelection.find((product) => product.id === id);

		if (!productFind || productFind.stock <= quantity) return;
		const newProducts = products.map((product) => (product.id === productFind.id ? { ...product, quantity: quantity } : { ...product }));
		setProducts(newProducts);
	};
	const dniValidated = (dni: string) => {
		const dniValidation = ValidateSalesDni.safeParse({ dni });
		if (!dniValidation.success) {
			const error = dniValidation.error.errors;
			setDniClient((client) => ({ ...client, error: error[0].message }));
			return false;
		}
		return true;
	};
	const productValidated = (product: string) => {
		const productValidation = ValidateSalesName.safeParse({ name: product });
		if (!productValidation.success) {
			const error = productValidation.error.errors;
			setProductSelected((product) => ({ ...product, error: error[0].message }));
			return false;
		}
		return true;
	};
	const handleModifiedDniClient = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isValidDni = dniValidated(e.target.value);
		if (!isValidDni) return;
		setDniClient(() => ({ error: '', value: e.target.value }));
	};

	const handleSearchClient = async () => {
		const isValidDni = dniValidated(dniClient.value);
		if (!isValidDni) return;
		const clientNew = await getClientByDNI(dniClient.value);
		if (!clientNew) return toast.error(`No se encontro el client con el dni ${dniClient.value}`);
		setClient(clientNew);
	};

	const handleModifiedProductSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isValidProduct = productValidated(e.target.value);
		if (!isValidProduct) return;
		setProductSelected(() => ({ error: '', value: e.target.value }));
	};
	const handleSearchProduct = async () => {
		const isValidProduct = productValidated(productSelected.value);
		if (!isValidProduct) return;
		const products = await getProductsByName({ name: productSelected.value });
		products && setProductsSelection(products.map((product) => ({ ...product, selected: false })));
	};
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
								onChange={handleModifiedDniClient}
							/>
							<Button type='button' className='rounded-r-md' onClick={handleSearchClient}>
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
								onChange={handleModifiedProductSelected}
							/>
							<Button type='button' className='rounded-r-md' onClick={handleSearchProduct}>
								Buscar
							</Button>
						</div>
						{productSelected.error && <span className='text-sm text-red-600'>{productSelected.error}</span>}
					</div>
					{productsSelection.length >= 1 && (
						<ul className='p-1 [margin-block:0.75rem] h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] grid gap-1'>
							{productsSelection.map((selection) => (
								<li
									key={selection.name}
									className={cn(
										'relative flex cursor-default select-none items-center rounded-sm  text-sm outline-none transition-colors border-2 ring-offset-background focus:bg-accent-foreground hover:cursor-pointer hover:text-accent-foreground focus:text-accent-foreground',
										{ 'ring-offset-red-700  bg-red-200': selection.selected === true }
									)}
									onClick={() => handleAddProduct(selection.id)}
								>
									<button
										className='size-full [padding-inline:1em] [padding-block:0.5em] disabled:cursor-not-allowed'
										disabled={selection.selected === true}
									>
										{selection.name}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>

				<TableSelectedProduct products={products} total={total} onChangeQuantityProduct={handleChangeQuantityProduct} />
			</div>
		</div>
	);
};
