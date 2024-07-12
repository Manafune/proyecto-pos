import { SalesContext } from '@/components/store/SalesStore';
import { getClientByDNI } from '@/lib/clients/getClient';
import { getProductsByName } from '@/lib/products/getProduct';
import { ValidateSalesDni, ValidateSalesName } from '@/lib/validation/sale';
import { useContext } from 'react';
import { toast } from 'sonner';

export const useSalesStore = () => {
	const { dispatch, storeSales } = useContext(SalesContext);
	const dniValidated = (dni: string) => {
		const { success, error } = ValidateSalesDni.safeParse({ dni });
		if (!success) {
			dispatch({ type: 'CHANGE_DNI_CLIENT_ERROR', payload: { error: error.errors[0].message } });
			return false;
		}
		return true;
	};
	const productValidated = (product: string) => {
		const { success, error } = ValidateSalesName.safeParse({ name: product });
		if (!success) {
			dispatch({ type: 'CHANGE_PRODUCT_SELECTED_ERROR', payload: { error: error.errors[0].message } });
			return false;
		}
		return true;
	};

	const onChangeDniClient = (dni: string) => {
		const isValidDni = dniValidated(dni);
		if (!isValidDni) return;
		dispatch({ type: 'CHANGE_DNI_CLIENT', payload: { dni } });
	};
	const onChangeQuantityProducts = ({ id, quantity }: { id: number; quantity: number }) => {
		dispatch({ type: 'CHANGE_QUANTITY_PRODUCTS', payload: { id, quantity } });
	};
	const onChangeProductSelected = ({ product }: { product: string }) => {
		const isValidProduct = productValidated(product);
		if (!isValidProduct) return;
		dispatch({ type: 'CHANGE_PRODUCT_SELECTED', payload: { product } });
	};

	const onAddProductTotal = ({ id }: { id: number }) => {
		dispatch({ type: 'ADD_PRODUCT_TOTAL', payload: { id } });
	};

	const onSearchClient = async () => {
		const isValidClient = dniValidated(storeSales.dniClient.dni);
		if (!isValidClient) return;
		const client = await getClientByDNI(storeSales.dniClient.dni);
		if (!client) return toast.error(`No se encontro el client con el dni ${storeSales.dniClient.dni}`);
		dispatch({ type: 'ADD_CLIENT', payload: { client } });
	};

	const onSearchProducts = async () => {
		const isValidProduct = productValidated(storeSales.productSelected.product);
		if (!isValidProduct) return;
		const products = await getProductsByName({ name: storeSales.productSelected.product });
		if (!products) return toast.error(`No se encontro productos `);
		const selectionProducts = products.map((product) => ({ ...product, selected: false }));
		dispatch({ type: 'ADD_PRODUCTS_SELECTION', payload: { products: selectionProducts } });
	};
	const onDeleteProductFromTotal = ({ id }: { id: number }) => {
		dispatch({ type: 'DELETE_PRODUCT_FROM_TOTAL', payload: { id } });
	};
	return {
		storeSales,
		onChangeDniClient,
		onChangeQuantityProducts,
		onChangeProductSelected,
		onAddProductTotal,
		onSearchClient,
		onSearchProducts,
		onDeleteProductFromTotal
	};
};
