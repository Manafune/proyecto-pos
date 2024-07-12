import { Customer } from './clients';

export const enum SaleStatus {
	COMPLETED = 'COMPLETED',
	CANCELED = 'CANCELED'
}
export interface DetailSales {
	id: number;
	quantity: number;
	price: number;
	subtotal: number;
	products: Products;
}

export interface Products {
	id: number;
	name: string;
	stock: number;
}

export interface SaleData {
	id: number;
	total: number;
	status: SaleStatus;
	customer: Customer;
	sale_date: string;
	detail_sale: DetailSales[];
}
