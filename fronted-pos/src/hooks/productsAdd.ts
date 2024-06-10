import { ProductsContext } from '@/components/store/ProductsAddStore';
import { ProductSchema } from '@/lib/validation/product';
import { State } from '@/reducer/Products';
import { Product } from '@/types/products';
import { useContext } from 'react';

const MAX_VALUE = 10;
export const useAddProductsStore = () => {
	const { dispatch, storeAddProducts } = useContext(ProductsContext);
	const onChangeProductSelection = (name: string) => {
		const validate = ProductSchema.safeParse({ name });
		if (validate.error !== undefined) {
			const dataError = validate.error.errors[0];
			return onAddErrorProduct({ productName: name, error: dataError.message });
		}
		dispatch({ type: 'CHANGE_PRODUCT_SELECTION', payload: name });
	};

	const onAddErrorProduct = (payload: State['productSelect']) => {
		dispatch({ type: 'ADD_ERROR_PRODUCT', payload });
	};

	const onCleanProductSelection = () => {
		dispatch({ type: 'CLEAN_PRODUCT_SELECTION' });
	};

	const onCleanTotalProducts = () => {
		dispatch({ type: 'CLEAN_TOTAL_PRODUCTS' });
	};

	const onUpdateProductFromTotal = (id: string, product: Partial<Product>) => {
		dispatch({ type: 'UPDATE_PRODUCT_FROM_TOTAL', payload: { id, product } });
	};

	const onAddProductToTotal = () => {
		if (!storeAddProducts.productSelect.productName || storeAddProducts.products.length > MAX_VALUE) return;
		dispatch({ type: 'ADD_PRODUCT_TO_TOTAL' });
		onCleanProductSelection();
	};

	const onIncrementStockFromTotal = (id: string) => {
		dispatch({ type: 'INCREMENT_STOCK_FROM_TOTAL', payload: id });
	};

	const onDeleteProductFromTotal = (id: string) => {
		onCleanProductSelection();
		dispatch({ type: 'DELETE_PRODUCT_FROM_TOTAL', payload: id });
	};

	return {
		storeAddProducts,
		onChangeProductSelection,
		onAddErrorProduct,
		onCleanProductSelection,
		onCleanTotalProducts,
		onUpdateProductFromTotal,
		onAddProductToTotal,
		onIncrementStockFromTotal,
		onDeleteProductFromTotal
	};
};
