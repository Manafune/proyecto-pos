import { createContext, useState, ReactNode } from 'react';
import { Container, Product } from '@/types/products';
import { ProductSchema } from '@/lib/validation/addProduct';
import { MemberStatus } from '@/types/members';
import { TableRowBodyType } from '../common/TableRowBody';

interface ProductsContextType {
	products: Product[];
	productSelect: {
		productName: string;
		error: string;
	};
	changeProductSelection: (value: string) => void;
	deleteProductFromTotal: (id: string) => void;
	addProductSelectionToTotal: () => void;
	cleanTotalProducts: () => void;
	updateProductFieldToTotal: TableRowBodyType<Product>['updateProduct'];
}

const MAX_VALUE = 10;
export const ProductsContext = createContext<ProductsContextType | null>(null);

// Create a provider component
export const ProductsAddStore = ({ children }: { children: ReactNode }) => {
	const [productSelect, setProductSelect] = useState<ProductsContextType['productSelect']>({
		productName: '',
		error: ''
	});
	const [products, setProducts] = useState<Product[]>([]);
	const cleanProductSeletion = () =>
		setProductSelect(() => ({
			productName: '',
			error: ''
		}));

	const changeProductSelection = (value: string) => {
		const validate = ProductSchema.safeParse({
			name: value
		});
		if (validate.error !== undefined) {
			const dataError = validate.error.errors[0];
			return setProductSelect({
				error: dataError.message,
				productName: value
			});
		}
		return setProductSelect({
			productName: value,
			error: ''
		});
	};

	const addProductSelectionToTotal = () => {
		if (!productSelect.productName || products.length >= MAX_VALUE) return;
		const name = productSelect.productName.trim().toUpperCase();
		const productFound = products.find((product) => product.name === name);
		if (productFound !== undefined) {
			cleanProductSeletion();
			return setProducts((products) =>
				products.map((product) => {
					if (product.name === name)
						return {
							...product,
							stock: product.stock + 1
						};
					return {
						...product
					};
				})
			);
		}
		if (!productSelect.error) {
			cleanProductSeletion();
			return setProducts((products) => [
				...products,
				{
					name,
					price: 0.01,
					status: MemberStatus.ACTIVE,
					stock: 1,
					container: Container.CAJA,
					id: crypto.randomUUID()
				}
			]);
		}
	};
	const updateProductFieldToTotal: TableRowBodyType<Product>['updateProduct'] = (id, updatedProps) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) => {
				if (product.id === id)
					return {
						...product,
						...updatedProps
					};
				return product;
			})
		);
	};
	const cleanTotalProducts = () => setProducts([]);
	const deleteProductFromTotal = (id: string) => {
		const productsFilter = products.filter((product) => product.id !== id);
		setProducts(productsFilter);
	};

	return (
		<ProductsContext.Provider
			value={{
				products,
				productSelect,
				changeProductSelection,
				addProductSelectionToTotal,
				updateProductFieldToTotal,
				cleanTotalProducts,
				deleteProductFromTotal
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};
