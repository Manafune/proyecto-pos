import supabase from '@/lib/supabase';
import { MemberData } from '@/types/members';

export interface UserData extends Omit<MemberData, 'id'> {
	id: number;
}

export const getAllUsers = async ({ current, pageSize }: { current: number; pageSize: number }): Promise<MemberData[]> => {
	try {
		const pageCurrent = (current - 1) * pageSize;
		const offset = pageCurrent + pageSize - 1;

		const { data, error } = await supabase
			.from('member')
			.select(
				`
                id,
                name,
                lastname,
                member_role!inner (
                    role,
                    status
                )
            `
			)
			.range(pageCurrent, offset);

		if (error) throw new Error(error.message);

		const formattedData = data.map((member) => ({
			member_id: member.id,
			member_name: member.name,
			member_lastname: member.lastname,
			member_role_app: member.member_role[0]?.role,
			member_status: member.member_role[0]?.status
		}));

		return formattedData;
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
};

export const getCountUsers = async (): Promise<number> => {
	try {
		const { count, error } = await supabase
			.from('member')
			.select('*', { count: 'exact', head: true });

		if (error) throw new Error(error.message);

		return count ?? 0;
	} catch (error) {
		console.error('Error fetching user count:', error);
		return 0;
	}
};


export const getUserById = async (id: string): Promise<MemberData | null> => {
	try {
		const { data, error } = await supabase
			.from('member')
			.select(
				`
                id,
                name,
                lastname,
                member_role!inner (
                    role,
                    status
                )
            `
			)
			.eq('id', id)  // Utiliza el UUID directamente en la consulta
			.single(); // Solo esperamos un registro

		if (error) throw new Error(error.message);

		if (data) {
			return {
				member_id: data.id,
				member_name: data.name,
				member_lastname: data.lastname,
				member_role_app: data.member_role[0]?.role,
				member_status: data.member_role[0]?.status
			};
		}
		
		return null;
	} catch (error) {
		console.error('Error fetching user by ID:', error);
		return null;
	}
};
