import { MemberStatus } from '@/types/members';
import { Container, Product } from '@/types/products';

export interface State {
	products: Product[];
	productSelect: {
		productName: string;
		error: string;
	};
}
export type ActionProductsAdd =
	| { type: 'CHANGE_PRODUCT_SELECTION'; payload: string }
	| { type: 'ADD_ERROR_PRODUCT'; payload: State['productSelect'] }
	| { type: 'CLEAN_PRODUCT_SELECTION' }
	| { type: 'CLEAN_TOTAL_PRODUCTS' }
	| { type: 'UPDATE_PRODUCT_FROM_TOTAL'; payload: { product: Partial<Product>; id: string } }
	| { type: 'ADD_PRODUCT_TO_TOTAL' }
	| { type: 'INCREMENT_STOCK_FROM_TOTAL'; payload: string }
	| { type: 'DELETE_PRODUCT_FROM_TOTAL'; payload: string };
export const initialState: State = {
	products: [],
	productSelect: {
		productName: '',
		error: ''
	}
};
const UPDATE_STATE_BY_ACTION: Record<ActionProductsAdd['type'], (state: State, action: ActionProductsAdd) => State> = {
	CHANGE_PRODUCT_SELECTION: (state, action) => {
		const payload = action.type === 'CHANGE_PRODUCT_SELECTION' ? action.payload : '';
		return {
			products: [...state.products],
			productSelect: {
				error: '',
				productName: payload
			}
		};
	},

	CLEAN_TOTAL_PRODUCTS: (state) => ({ productSelect: { ...state.productSelect }, products: [] }),
	ADD_ERROR_PRODUCT: (state, action) => {
		const payload = action.type === 'ADD_ERROR_PRODUCT' ? action.payload : { productName: '', error: '' };
		return { products: [...state.products], productSelect: { ...payload } };
	},
	DELETE_PRODUCT_FROM_TOTAL: ({ products, productSelect }, action) => {
		const payload = action.type === 'DELETE_PRODUCT_FROM_TOTAL' ? action.payload : '';
		const productsFilter = products.filter((product) => product.id !== payload);
		return { productSelect: { ...productSelect }, products: productsFilter };
	},
	CLEAN_PRODUCT_SELECTION: (state) => ({ products: [...state.products], productSelect: { error: '', productName: '' } }),
	UPDATE_PRODUCT_FROM_TOTAL: (state, action) => {
		const { id, product: updated } = action.type === 'UPDATE_PRODUCT_FROM_TOTAL' ? action.payload : { id: '0', product: {} };
		const products = state.products.map((product) => (product.id === id ? { ...product, ...updated } : product));
		return { products, productSelect: { ...state.productSelect } };
	},
	INCREMENT_STOCK_FROM_TOTAL: (state, action) => {
		const { id } = action.type === 'UPDATE_PRODUCT_FROM_TOTAL' ? action.payload : { id: '0' };
		const productFound = state.products.find((product) => product.id === id);
		const newProducts = state.products.map((product) => (product.id === productFound?.id ? { ...product, stock: product.stock + 1 } : product));
		return { products: newProducts, productSelect: { ...state.productSelect } };
	},
	ADD_PRODUCT_TO_TOTAL: (state) => {
		const newProducts = [
			...state.products,
			{
				name: state.productSelect.productName,
				price: 0.01,
				status: MemberStatus.ACTIVE,
				stock: 1,
				container: Container.CAJA,
				id: crypto.randomUUID()
			}
		];
		return { products: newProducts, productSelect: { productName: '', error: '' } };
	}
};
export const reducerProducts = (state: State = initialState, action: ActionProductsAdd): State => {
	const handler = UPDATE_STATE_BY_ACTION[action.type];
	return handler ? handler(state, action) : state;
};
