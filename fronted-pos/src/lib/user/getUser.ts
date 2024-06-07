import supabase from '@/lib/supabase';
import { MemberData } from '@/types/members';
import { type User } from '@/types/user';

export interface UserData extends Omit<User, 'id'> {
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
