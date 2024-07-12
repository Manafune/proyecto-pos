import { createContext, ReactNode, useReducer } from 'react';
import { SalesState, salesReducer, initialState, SalesAction } from '@/reducer/Sales';

interface ReturnData {
	storeSales: SalesState;
	dispatch: React.Dispatch<SalesAction>;
}

export const SalesContext = createContext<ReturnData>({
	storeSales: initialState,
	dispatch: () => {}
});

export const SalesStore = ({ children }: { children: ReactNode }) => {
	const [storeSales, dispatch] = useReducer(salesReducer, initialState);

	return <SalesContext.Provider value={{ storeSales, dispatch }}>{children}</SalesContext.Provider>;
};
