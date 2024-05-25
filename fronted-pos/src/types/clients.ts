import { MemberStatus } from '@/types/members';

export interface Client {
	name: string;
	lastname: string;
	dni: string;
	dateofbirth: Date;
	phone: string;
	status: MemberStatus;
	id: string;
}
