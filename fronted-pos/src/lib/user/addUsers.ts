import { User } from '@/types/members';
import supabase from '@/lib/supabase';

interface ApiResponse {
  data?: User[]; // Update this according to the actual response structure
  errors?: { message: string; code: string; name: string }[];
}

export const addUsers = async ({ user }: { user: User }): Promise<ApiResponse> => {
  try {
    const { data, error } = await supabase
      .from('member')
      .insert({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        status: user.status,
      })
      .select();

    if (error) {
      const messageResponse =
        error.code === '23505'
          ? 'El correo electrónico ya está en uso'
          : 'Ocurrió un error al añadir el usuario';

      const response: ApiResponse = {
        errors: [
          {
            message: messageResponse,
            code: error.code,
            name: 'ErrorUsuario',
          },
        ],
      };
      return response;
    }

    if (data) {
      const memberId = data[0].id;
      const roleResponse = await supabase
        .from('member_role')
        .insert({
          user_id: memberId,
          role: user.role_app,
          status: user.status,
        })
        .select();

      if (roleResponse.error) {
        const response: ApiResponse = {
          errors: [
            {
              message: 'Ocurrió un error al asignar el rol',
              code: roleResponse.error.code,
              name: 'ErrorRol',
            },
          ],
        };
        return response;
      }
    }

    const response: ApiResponse = { data };
    return response;
  } catch (error) {
    throw new Error('Un error inesperado ocurrió al añadir el usuario.');
  }
};
