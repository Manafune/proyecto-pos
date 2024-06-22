import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { SignOutSchema, type SignOutSchemaValidator } from '@/lib/validation/validation';
import supabase from '@/lib/supabase';

export const useSignUp = () => {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<SignOutSchemaValidator>({
		resolver: zodResolver(SignOutSchema)
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			const { data: supaData, error } = await supabase.auth.signUp({
				email: data.email,
				password: data.password,
				options: {
					data: {
						name: data.name,
						lastName: data.lastname
					},
					emailRedirectTo: `${window.location.origin}/`
				}
			});
			if (supaData.user && supaData.user.identities && supaData.user.identities.length === 0) 
				return toast.error('AuthApiError', { duration: 2000, description: 'El usuario ya existe' });
			
			if (error) 
				return toast.error(error.name, { duration: 2000, description: error.message });
			
		} catch (error) {
			console.log(error);
		}
	});

	return { onSubmit, register, errors };
};


