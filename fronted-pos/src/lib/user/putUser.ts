import supabase from "../supabase";
import { UpdateUserData } from '@/types/members';

export const updateUser = async ({ id, first_name, last_name, role, status }: UpdateUserData): Promise<void> => {
    try {
        // Update the user's basic information in the member table
        const { error: userError } = await supabase
            .from('member')
            .update({ name: first_name, lastname: last_name })
            .eq('id', id);

        if (userError) throw new Error(userError.message);

        // Update the user's role and status in the member_role table
        const { error: roleError } = await supabase
            .from('member_role')
            .update({ role, status })
            .eq('member_id', id);

        if (roleError) throw new Error(roleError.message);

        console.log('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error);
    }
};