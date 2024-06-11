export type RemovePrefix<OriginalKeys, Prefix extends string> = {
	[Key in keyof OriginalKeys as Key extends `${Prefix}${infer Rest}` ? Uncapitalize<Rest> : Key]: OriginalKeys[Key];
};
export type AddPrefix<OriginalKeys, Prefix extends string> = {
	[Key in keyof OriginalKeys as `${Prefix}${Key & string}`]: OriginalKeys[Key];
};
export interface AddressCustomer {
	id?: number;
	street: string;
	city: string;
	state: string;
	customer?: Customer[];
}

export type AddressByCustomer = Omit<AddressCustomer, 'customer'> & {
	customer?: Customer;
};

export interface Customer {
	id?: number;
	dni: string;
	last_name: string;
	birth_date: string;
	first_name: string;
}

type PrefixCustomer = AddPrefix<Customer, 'customer_'>;
type PrefixAddress = AddPrefix<Omit<AddressCustomer, 'customer'>, 'address_'>;
export type PrefixAddressCustomer = PrefixCustomer & PrefixAddress;
