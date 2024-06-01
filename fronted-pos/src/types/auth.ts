export interface UserToken {
	aal: string;
	amr?: AmrEntity[] | null;
	app_metadata: AppMetadata;
	aud: string;
	email: string;
	exp: number;
	iat: number;
	is_anonymous: boolean;
	iss: string;
	phone: string;
	role: string;
	session_id: string;
	sub: string;
	user_metadata: UserMetadata;
	user_role: string;
	user_status: string;
}
export interface AmrEntity {
	method: string;
	timestamp: number;
}
export interface AppMetadata {
	provider: string;
	providers?: string[] | null;
}
export interface UserMetadata {
	name?: string;
	lastName?: string;
}
