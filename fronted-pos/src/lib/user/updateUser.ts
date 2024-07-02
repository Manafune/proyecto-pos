import supabase from '@/lib/supabase';
import { type ProfilechemaValidator } from '@/lib/validation/validation';
import { MemberData } from '@/types/members';
type UserType = Omit<ProfilechemaValidator, 'password' | 'role'> & { id: string };

interface ApiResponse {
	data?: MemberData;
	errors?: { message: string; code: string; name: string }[];
}

export const updateUserProfile = async ({ confirmPassword, lastname, name, id }: UserType): Promise<ApiResponse> => {
	try {
		const { error: authError } = await supabase.auth.updateUser({
			password: confirmPassword,
			data: {
				name,
				lastName: lastname,
				status
			}
		});
		if (authError !== null) {
			const errorMessage =
				authError.name === 'AuthApiError' ? 'La nueva contraseña debe ser diferente a la anterior' : 'error al actualizar el usuario';
			return { errors: [{ message: errorMessage, code: authError.code ?? '', name: 'Error de autenticacion' }] };
		}

		const { data, error: memberError } = await supabase.rpc('update_member', {
			member_id: id,
			member_lastname: lastname,
			member_name: name
		});

		if (memberError !== null) return { errors: [{ message: memberError.message, code: memberError.code, name: memberError.hint }] };

		const dataMember: MemberData = data;
		return { data: dataMember };
	} catch (error) {
		return { errors: [{ message: 'Internal server error', code: '500', name: 'InternalError' }] };
	}
};
