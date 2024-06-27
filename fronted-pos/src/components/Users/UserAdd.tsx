import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import supabase from '@/lib/supabase';
import { SignOutSchema, SignOutSchemaValidator } from '@/lib/validation/validation';
import { MemberRole, MemberStatus } from '@/types/members';
import { toast } from 'sonner';
import UserAddHeader from './UserAdd/UserAddHeader';
import UserForm from './UserAdd/UserForm';
import StepsList from './UserAdd/StepsList';

const UserAdd = () => {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm<SignOutSchemaValidator>({
        resolver: zodResolver(SignOutSchema),
    });

    const onSubmit = async (data: SignOutSchemaValidator) => {
        try {
            const { data: supaData, error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        name: data.name,
                        lastName: data.lastname,
                        role_app: data.role as MemberRole,
                        status: MemberStatus.ACTIVE,
                    },
                    emailRedirectTo: `${window.location.origin}/`,
                },
            });

            if (supaData?.user && supaData.user?.identities && supaData.user.identities.length === 0) {
                return toast.error('AuthApiError', { duration: 2000, description: 'El usuario ya existe' });
            }

            if (error) {
                return toast.error(error.name, { duration: 2000, description: error.message });
            }

            toast.success('Usuario creado con éxito');
        } catch (error) {
            console.error(error);
            toast.error('Error inesperado', { duration: 2000, description: 'Ocurrió un error inesperado al añadir el usuario.' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
            <div className="w-full max-w-7xl">
                <UserAddHeader handleSubmit={handleSubmit} onSubmit={onSubmit} />
                <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <UserForm
                            onSubmit={handleSubmit(onSubmit)}
                            register={register}
                            control={control}
                            errors={errors}
                        />
                    </div>
                    <StepsList />
                </div>
            </div>
        </div>
    );
};

export default UserAdd;
