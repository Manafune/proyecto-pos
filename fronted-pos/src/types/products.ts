import { MemberStatus } from '@/types/members';

export interface Product {
	name: string;
	price: number;
	stock: number;
	status: MemberStatus;
	container: string;
}
