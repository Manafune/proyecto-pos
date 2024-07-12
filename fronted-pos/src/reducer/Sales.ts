import { Customer } from '@/types/clients';
import { ResponseProduct } from '@/types/products';

export interface ProductsSelected {
	name: string;
	quantity: number;
	price: number;
	subtotal: number;
	id: number;
	stock: number;
}
export type ProductsSelectionType = ResponseProduct & { selected: boolean };
export interface SalesState {
	dniClient: { dni: string; error: string };
	client: Omit<Customer, 'birth_date'> | null;
	productSelected: { product: string; error: string };
	productsSelection: ProductsSelectionType[];
	products: ProductsSelected[];
}
export type SalesAction =
	| { type: 'ADD_PRODUCT_TOTAL'; payload: { id: number } }
	| { type: 'DELETE_PRODUCT_FROM_TOTAL'; payload: { id: number } }
	| { type: 'ADD_CLIENT'; payload: { client: SalesState['client'] } }
	| { type: 'ADD_PRODUCTS_SELECTION'; payload: { products: SalesState['productsSelection'] } }
	| { type: 'CHANGE_QUANTITY_PRODUCTS'; payload: { id: number; quantity: number } }
	| { type: 'CHANGE_DNI_CLIENT'; payload: { dni: string } }
	| { type: 'CHANGE_DNI_CLIENT_ERROR'; payload: { error: string } }
	| { type: 'CHANGE_PRODUCT_SELECTED'; payload: { product: string } }
	| { type: 'CHANGE_PRODUCT_SELECTED_ERROR'; payload: { error: string } };
export const initialState: SalesState = {
	dniClient: { dni: '', error: '' },
	client: null,
	productSelected: { product: '', error: '' },
	productsSelection: [],
	products: []
};

const salesActionHandlers: Record<SalesAction['type'], (state: SalesState, action: SalesAction) => SalesState> = {
	CHANGE_DNI_CLIENT: (state, action) => {
		if (action.type !== 'CHANGE_DNI_CLIENT') return { ...state };
		const { dni } = action.payload;
		return {
			...state,
			dniClient: { dni, error: '' }
		};
	},
	CHANGE_DNI_CLIENT_ERROR: (state, action) => {
		if (action.type !== 'CHANGE_DNI_CLIENT_ERROR') return { ...state };
		const { error } = action.payload;
		return {
			...state,
			dniClient: { ...state.dniClient, error }
		};
	},
	CHANGE_QUANTITY_PRODUCTS: (state, action) => {
		if (action.type !== 'CHANGE_QUANTITY_PRODUCTS') return { ...state };
		const { id, quantity } = action.payload;
		const productFind = state.productsSelection.find((product) => product.id === id);
		if (!productFind || productFind.stock <= quantity) return { ...state };
		const newProducts = state.products.map((product) =>
			product.id === productFind.id ? { ...product, quantity: quantity, subtotal: quantity * product.price } : { ...product }
		);
		return {
			...state,
			products: newProducts
		};
	},
	CHANGE_PRODUCT_SELECTED: (state, action) => {
		if (action.type !== 'CHANGE_PRODUCT_SELECTED') return { ...state };

		const { product } = action.payload;
		return {
			...state,
			productSelected: { product, error: '' }
		};
	},
	CHANGE_PRODUCT_SELECTED_ERROR: (state, action) => {
		if (action.type !== 'CHANGE_PRODUCT_SELECTED_ERROR') return { ...state };
		const { error } = action.payload;
		return {
			...state,
			productSelected: { ...state.productSelected, error }
		};
	},
	ADD_PRODUCT_TOTAL: (state, action) => {
		if (action.type !== 'ADD_PRODUCT_TOTAL') return { ...state };
		const { id } = action.payload;
		const productFind = state.productsSelection.find((product) => product.id === id);
		if (!productFind || productFind.selected === true) return { ...state };
		const productToAdd = {
			name: productFind.name,
			quantity: 1,
			price: productFind.price,
			id: productFind.id,
			subtotal: 1 * productFind.price,
			stock: productFind.stock
		};
		const productsSelection = state.productsSelection.map((product) => {
			if (product.id === productFind?.id) return { ...product, selected: true };
			return product;
		});
		return {
			...state,
			productsSelection,
			products: [...state.products, productToAdd]
		};
	},
	DELETE_PRODUCT_FROM_TOTAL: (state, action) => {
		if (action.type !== 'DELETE_PRODUCT_FROM_TOTAL') return { ...state };
		const { id } = action.payload;

		const products = state.products.filter((product) => product.id !== id);
		const productsSelection = state.productsSelection.map((productSelection) =>
			productSelection.id === id ? { ...productSelection, selected: false } : { ...productSelection }
		);
		return {
			...state,
			products,
			productsSelection
		};
	},
	ADD_CLIENT: (state, action) => {
		if (action.type !== 'ADD_CLIENT') return { ...state };
		const { client } = action.payload;
		return {
			...state,
			client
		};
	},
	ADD_PRODUCTS_SELECTION: (state, action) => {
		if (action.type !== 'ADD_PRODUCTS_SELECTION') return { ...state };
		const { products } = action.payload;
		return {
			...state,
			productsSelection: products
		};
	}
};
export const salesReducer = (state: SalesState = initialState, action: SalesAction): SalesState => {
	const handler = salesActionHandlers[action.type];
	return handler ? handler(state, action) : state;
};
