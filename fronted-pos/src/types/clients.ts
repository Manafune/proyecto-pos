import { AddPrefix } from './common';

export interface AddressCustomer {
	id: number;
	street: string;
	city: string;
	state: string;
	customer?: Customer[];
}

export type AddressByCustomer = Omit<AddressCustomer, 'customer'> & {
	customer?: Customer;
};

export interface Customer {
	id: number;
	dni: string;
	last_name: string;
	birth_date: Date;
	first_name: string;
}
export type ErrorsCustomer = Omit<AddressByCustomer, 'id' | 'customer'> & Omit<Customer, 'id' | 'birth_date'> & { birth_date: string };
type PrefixCustomer = AddPrefix<Customer, 'customer_'>;
type PrefixAddress = AddPrefix<Omit<AddressCustomer, 'customer'>, 'address_'>;
export type PrefixAddressCustomer = PrefixCustomer & PrefixAddress;
