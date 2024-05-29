export const enum MemberStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

// Definir enumeración para MemberRole
export const enum MemberRole {
	MEMBER = 'MEMBER',
	OTRO_ROL = 'ADMIN',
	SELLER = 'SELLER',
	STOREKEEPER = 'STOREKEEPER',
}
export type MemberData = {
	member_id: string;
	member_lastname: string;
	member_name: string;
	member_status: MemberStatus;
	member_role_app: MemberRole;
};
