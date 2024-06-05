import { Product } from '@/types/products';

type Action =
	| { type: 'CHANGE_PRODUCT_SELECTION'; value: string }
	| { type: 'ADD_PRODUCT_TO_TOTAL' }
	| { type: 'UPDATE_PRODUCT_FIELD'; id: string | number; updatedProps: Partial<Product> }
	| { type: 'CLEAN_TOTAL_PRODUCTS' }
	| { type: 'DELETE_PRODUCT_FROM_TOTAL'; id: string | number };

interface State {
	products: Product[];
	productSelect: {
		productName: string;
		error: string;
	};
}

export const initialState: State = {
	products: [],
	productSelect: {
		productName: '',
		error: ''
	}
};
export const reducerProducts = (state: State, action: Action): State => {
	switch (action.type) {
		case 'CHANGE_PRODUCT_SELECTION':
			return {
				...state,
				productSelect: {
					...state.productSelect,
					productName: action.value,
					error: ''
				}
			};
		default:
			return state;
	}
};
