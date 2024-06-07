import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import supabase from '@/lib/supabase';
import { SignOutSchema, type SignOutSchemaValidator } from '@/lib/validation/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
const SignOut = () => {
	const navigate = useNavigate({ from: '/sign-in' });

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

			if (error) return toast.error(error.name, { duration: 2000, description: error.message });
			return navigate({ to: '/sign-in' });
		} catch (error) {
			console.log(error);
		}
	});

	return (
		<Card className='w-full absolute inset-1/2 [translate:-50%_-50%] max-w-md h-fit'>
			<CardHeader>
				<CardTitle className='text-2xl'>Registro de Usuario</CardTitle>
				<CardDescription>Ingresa tu información para crear una cuenta</CardDescription>
			</CardHeader>
			<CardContent>
				<form className='grid gap-4' onSubmit={onSubmit}>
					<div className='grid gap-2'>
						<Label htmlFor='name'>Nombre</Label>
						<Input id='name' placeholder='Nombre' type='text' autoComplete='name' {...register('name')} />
						{errors.name !== undefined && <span className='text-sm text-red-600'>{errors.name.message}</span>}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='lastName'>Apellido</Label>
						<Input id='lastName' placeholder='Apellido' {...register('lastname')} />
						{errors.lastname !== undefined && <span className='text-sm text-red-600'>{errors.lastname.message}</span>}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Correo Electrónico</Label>
						<Input id='email' placeholder='ejemplo@gmail.com' autoComplete='email' {...register('email')} />
						{errors.email !== undefined && <span className='text-sm text-red-600'>{errors.email.message}</span>}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='password'>Contraseña</Label>
						<Input id='password' type='password' autoComplete='current-password' placeholder='***-***-**' {...register('password')} />
						{errors.password !== undefined && <span className='text-sm text-red-600'>{errors.password?.message}</span>}
					</div>
					<Button type='submit' className='w-full'>
						{'Crear Cuenta'}
					</Button>
				</form>
				<div className='mt-4 text-center text-sm'>
					¿Ya tienes una cuenta?
					<Link to='/sign-in' className='underline'>
						Inicia Sesion
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};
export default SignOut;
