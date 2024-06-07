import { MemberRole, MemberStatus} from '@/types/members';

export interface User {
	id: string;
    name: string;
	lastname: string;
    role_app: MemberRole;
	status: MemberStatus;

}
