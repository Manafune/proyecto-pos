export interface AddressCustomer {
	id: number;
	street: string;
	city: string;
	state: string;
	customer?: Customer[] | null;
}
export interface Customer {
	id: number;
	dni: string;
	last_name: string;
	birth_date: string;
	first_name: string;
}
