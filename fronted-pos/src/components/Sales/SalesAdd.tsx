import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { getClientByDNI } from '@/lib/clients/getClient';
import { Customer } from '@/types/clients';
import { toast } from 'sonner';
import { ValidateSalesDni, ValidateSalesName } from '@/lib/validation/sale';
import { getProductsByName } from '@/lib/products/getProduct';
import { ResponseProduct } from '@/types/products';

const initialProducts = [
	{ name: 'Producto 1', quantity: 1, price: 100, subtotal: 100 },
	{ name: 'Producto 2', quantity: 2, price: 150, subtotal: 300 },
	{ name: 'Producto 3', quantity: 3, price: 200, subtotal: 600 }
];

export const SalesAdd = () => {
	const [dniClient, setDniClient] = useState({ value: '', error: '' });
	const [client, setClient] = useState<Omit<Customer, 'birth_date'> | null>(null);
	const [productSelected, setProductSelected] = useState({ value: '', error: '' });
	const [productsSelection, setProductsSelection] = useState<ResponseProduct[]>([]);

	const [products, setProducts] = useState(initialProducts);
	const total = products.reduce((sum, product) => sum + product.subtotal, 0);
	// const handleAddProduct = () => {
	// 	const productToAdd = {
	// 		...newProduct,
	// 		subtotal: newProduct.quantity * newProduct.price
	// 	};
	// 	setProducts([...products, productToAdd]);
	// 	setNewProduct({ name: '', quantity: 0, price: 0, subtotal: 0 });
	// };

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
		products && setProductsSelection(products);
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
									className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent-foreground hover:bg-accent hover:cursor-pointer hover:text-accent-foreground focus:text-accent-foreground'
								>
									{selection.name}
								</li>
							))}
						</ul>
					)}
					<div className='mb-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div>
							<Label htmlFor='product-name' className='block text-sm font-medium text-gray-700'>
								Producto
							</Label>
							<Input
								type='text'
								name='product-name'
								id='product-name'
								className='mt-1 block w-full sm:text-sm border-gray-300 rounded-md'
								readOnly
								// value={newProduct.name}
							/>
						</div>
						<div>
							<Label htmlFor='quantity' className='block text-sm font-medium text-gray-700'>
								Cantidad
							</Label>
							<Input
								type='number'
								name='quantity'
								id='quantity'
								className='mt-1 block w-full sm:text-sm border-gray-300 rounded-md'
								// value={newProduct.quantity}
								// onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
							/>
						</div>
						<div>
							<Label htmlFor='price' className='block text-sm font-medium text-gray-700'>
								Precio
							</Label>
							<Input
								type='number'
								name='price'
								id='price'
								className='mt-1 block w-full sm:text-sm border-gray-300 rounded-md'
								// value={newProduct.price}
								// onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
							/>
						</div>
					</div>

					<Button type='button' className='w-full'>
						Añadir
					</Button>
				</div>

				<div className='overflow-x-auto mb-6'>
					<Table className='min-w-full divide-y divide-gray-200'>
						<TableHeader>
							<TableRow>
								<TableHead className='w-[100px]'>Producto</TableHead>
								<TableHead>Cantidad</TableHead>
								<TableHead>Precio</TableHead>
								<TableHead className='text-right'>Subtotal</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map((product) => (
								<TableRow key={product.name}>
									<TableCell className='font-medium text-sm'>{product.name}</TableCell>
									<TableCell>
										<Input type='number' value={product.quantity} className='w-16' readOnly />
									</TableCell>
									<TableCell>${product.price}</TableCell>
									<TableCell className='text-right'>${product.subtotal}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<div className='grid grid-cols-[50%_1fr_1fr] mb-6'>
						<p className='text-lg font-medium text-gray-700'>Total: ${total}</p>
						<Button
							type='button'
							className='bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
						>
							Generar Venta
						</Button>
						<Button
							type='button'
							className='ml-2 bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Cancelar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
