import { MemberStatus } from '@/types/members';
export const enum Container {
	CAJA = 'CAJA',
	BOLSA = 'BOLSA',
	LATA = 'LATA',
	BOTELLA = 'BOTELLA'
}
export interface Product {
	name: string;
	price: number;
	stock: number;
	status: MemberStatus;
	container: Container;
	id: string;
}
// ------------------------------ api supabas-------------------
export interface ResponseProduct {
	id: number;
	name: string;
	container: Container;
	price: number;
	stock: number;
	created_at: string;
	status: MemberStatus;
}
