import { MemberStatus } from '@/types/members';

export interface Client {
	name: string;
	lastname: string;
	dni: string;
	dateofbirth: Date;
	address: {street: String
		, city: String
		, state: String
	};
	status: MemberStatus;
	id: string;
}
