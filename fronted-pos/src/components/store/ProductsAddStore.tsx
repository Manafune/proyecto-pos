import { createContext, ReactNode, useReducer } from 'react';
import { ActionProductsAdd, initialState, reducerProducts, State } from '@/reducer/Products';

interface ReturnData {
	storeAddProducts: State;
	dispatch: React.Dispatch<ActionProductsAdd>;
}

export const ProductsContext = createContext<ReturnData>({
	storeAddProducts: initialState,
	dispatch: () => {}
});

export const ProductsAddStore = ({ children }: { children: ReactNode }) => {
	const [storeAddProducts, dispatch] = useReducer(reducerProducts, initialState);

	return <ProductsContext.Provider value={{ storeAddProducts, dispatch }}>{children}</ProductsContext.Provider>;
};
