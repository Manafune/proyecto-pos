import supabase from '@/lib/supabase';
import { type ProfilechemaValidator } from '../validation/validation';
import { MemberData } from '@/types/products';
type UserType = Omit<ProfilechemaValidator, 'password'> & { id: string };

interface ApiResponse {
	data?: MemberData;
	errors?: { message: string; code: string; name: string }[];
}

export const updateUserProfile = async ({
	confirmPassword,
	lastname,
	name,
	status,
	id,
}: UserType): Promise<ApiResponse> => {
	try {
		// Actualizar el usuario
		const { error: authError } = await supabase.auth.updateUser({
			password: confirmPassword,
			data: {
				name,
				lastName: lastname,
				status,
			},
		});

		if (authError !== null) {
			return { errors: [{ message: authError.message, code: authError.code ?? '', name: authError.name }] };
		}

		// Actualizar el miembro y el rol
		const { data, error: memberError } = await supabase.rpc('update_member_and_role', {
			member_id: id,
			member_lastname: lastname,
			member_name: name,
			member_role_app: 'MEMBER',
			member_status: status,
		});

		if (memberError !== null) {
			return { errors: [{ message: memberError.message, code: memberError.code, name: memberError.hint }] };
		}
		const dataMember: MemberData = data;
		return { data: dataMember };
	} catch (error) {
		return { errors: [{ message: 'Internal server error', code: '500', name: 'InternalError' }] };
	}
};
