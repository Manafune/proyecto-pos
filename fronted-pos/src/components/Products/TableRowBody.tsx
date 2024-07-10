import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types/products';
import { type ProductData } from '@/lib/products/getProduct';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProductPriceStockSchema } from '@/lib/validation/product'
export interface TableRowBodyType<TypeProduct> {
	product: TypeProduct;
	updateProduct: (id: string | number, updatedProps: Partial<TypeProduct>) => void;
	deleteProduct?: (id: string | number) => void;
	isTooltip?: boolean;
	isName?: boolean;
}

export const TableRowBody = <TypeProduct extends Product | ProductData>({
	product,
	updateProduct,
	deleteProduct,
	isName = false,
	isTooltip = true
}: TableRowBodyType<TypeProduct>) => {
	
	const [validationErrors, setValidationErrors] = useState<{ stock?: string; price?: string }>({});
	
	useEffect(() => {
		validateFields(); // Validate fields on initial load
	}, [product]);

	const validateFields = () => {
		const validationResult = ProductPriceStockSchema.safeParse({
			stock: product.stock,
			price: product.price
		});
	
		if (!validationResult.success) {
			const errors: { stock?: string; price?: string } = {};
			validationResult.error.errors.forEach((error) => {
			if (error.path.includes('stock')) {
				errors.stock = error.message;
			} else if (error.path.includes('price')) {
				errors.price = error.message;
			}
		});
			setValidationErrors(errors);
		} else {
			setValidationErrors({});
		}
	};

	const handleChangeStock = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newStockValue = Number(e.currentTarget.value);
		updateProduct(product.id, {
		...(product as Partial<TypeProduct>),
		stock: newStockValue
		});
	};
	
	const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPriceValue = Number(e.currentTarget.value);
		updateProduct(product.id, {
		...(product as Partial<TypeProduct>),
		price: newPriceValue
		});
	};
	
	const handleSelectContainer = (selectedContainer: string) => {
		updateProduct(product.id, {
		...(product as Partial<TypeProduct>),
		container: selectedContainer
		});
	};

	return (
		<TableRow key={`${product.name}-${product.id}`} className='relative group'>
			{isName && <TableCell>{product.name}</TableCell>}
			<TableCell>
				<Label htmlFor={`stock-${product.id}`} className='sr-only'>
				Stock
				</Label>
				<Input
				id={`stock-${product.id}`}
				type='number'
				min={1}
				max={10000}
				value={product.stock}
				onChange={handleChangeStock}
				className={validationErrors.stock ? 'border-red-500' : ''}
				/>
				{validationErrors.stock && <span className='text-red-500'>{validationErrors.stock}</span>}
			</TableCell>
			<TableCell>
				<Label htmlFor={`price-${product.id}`} className='sr-only'>
				Precio
				</Label>
				<Input
				id={`price-${product.id}`}
				min={0.01}
				max={10000}
				type='number'
				step={0.01}
				inputMode='decimal'
				value={product.price}
				onChange={handleChangePrice}
				className={validationErrors.price ? 'border-red-500' : ''}
				/>
				{validationErrors.price && <span className='text-red-500'>{validationErrors.price}</span>}
			</TableCell>
			<TableCell>
				<Select
				defaultValue={product.container.toUpperCase() ?? 'BOLSA'}
				onValueChange={handleSelectContainer}
				>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Elige un contenedor' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='BOLSA'>Bolsa</SelectItem>
					<SelectItem value='CAJA'>Caja</SelectItem>
					<SelectItem value='LATA'>Lata</SelectItem>
					<SelectItem value='BOTELLA'>Botella</SelectItem>
				</SelectContent>
				</Select>
			</TableCell>
			{isTooltip && deleteProduct && (
				<td
				className='absolute hidden rounded-full size-[1.2rem] bg-red-500 z-[100] text-white group-hover:grid group-hover:items-center group-hover:justify-center group-hover:inset-[0_0_0_auto] cursor-pointer '
				onClick={() => deleteProduct(product.id)}
				>
				<X className='size-[95%] block' />
				</td>
			)}
    </TableRow>
	);
};
