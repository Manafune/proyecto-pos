
import { ProductsContext } from '@/components/store/ProductsAddStore';
import { useContext } from 'react';

export const useAddProducts=()=> {
	const context = useContext(ProductsContext);
	if (!context) {
		throw new Error('products must be in products add Provider');
	}
	return context;
}
