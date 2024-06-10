import { createContext, ReactNode, useReducer } from 'react';
import { ActionProductsAdd, initialState, reducerProducts, State } from '@/reducer/Products';

interface ReturnData {
	storeAddProducts: State;
	dispatch: React.Dispatch<ActionProductsAdd>; // Tipo de la función dispatch
}

export const ProductsContext = createContext<ReturnData>({
	storeAddProducts: initialState,
	dispatch: () => {}
});

// Create a provider component
export const ProductsAddStore = ({ children }: { children: ReactNode }) => {
	const [storeAddProducts, dispatch] = useReducer(reducerProducts, initialState);

	return <ProductsContext.Provider value={{ storeAddProducts, dispatch }}>{children}</ProductsContext.Provider>;
};
