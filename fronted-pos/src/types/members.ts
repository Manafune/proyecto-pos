export const enum MemberStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

// Definir enumeración para MemberRole
export const enum MemberRole {
    MEMBER = 'MEMBER',
    ADMIN = 'ADMIN', // Cambié OTRO_ROL a ADMIN
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

export type User = {
    email: string;
    name: string;
    lastname: string;
    role_app: MemberRole;
    status: MemberStatus;
    id: string;
}

export interface UpdateUserData {
    id: number;
    first_name: string;
    last_name: string;
    role: string;
    status: string;
}