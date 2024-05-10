import supabase from '@/lib/supabase';
import { type ProfilechemaValidator } from '../validation/validation';
type UserType = Omit<ProfilechemaValidator, 'password'> & { id: string };
export const updateUserProfile = async ({ confirmPassword, lastname, name, status, id }: UserType) => {
	const { error } = await supabase.auth.updateUser({
		password: confirmPassword,
		data: {
			name: name,
			lastName: lastname,
			status: status,
		},
	});
	if (error !== null) return { message: error.message, code: error.code, name: error.name };
	const { error: errorMember } = await supabase.rpc('update_member_and_role', {
		member_id: id,
		member_lastname: lastname,
		member_name: name,
		member_role_app: 'MEMBER',
		member_status: status,
	});

	if (errorMember !== null) return { message: errorMember.message, code: errorMember.code, name: errorMember.hint };

	return true;
};
