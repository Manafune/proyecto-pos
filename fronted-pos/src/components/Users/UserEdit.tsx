import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchema, ProfilechemaValidator } from '@/lib/validation/validation';
import { toast } from 'sonner';
import UserEditHeader from './UserEdit/UserEditHeader';
import UserForm from './UserEdit/UserForm';
import StepsList from './UserEdit/StepList';

const UserEdit = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ProfilechemaValidator>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = async (data: ProfilechemaValidator) => {
    try {
      console.log(data);
      const response = await fetch('/api/edit-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error al guardar los datos');
      }

      toast.success('Usuario editado con éxito');
    } catch (error) {
      console.error(error);
      toast.error('Error inesperado', { duration: 2000, description: 'Ocurrió un error inesperado al editar el usuario.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-7xl">
        <UserEditHeader handleSubmit={handleSubmit} onSubmit={onSubmit} />
        <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UserForm onSubmit={handleSubmit(onSubmit)} register={register} control={control} errors={errors} />
          </div>
          <StepsList />
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
