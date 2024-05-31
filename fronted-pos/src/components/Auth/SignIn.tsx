import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import supabase from '@/lib/supabase';
import { BaseSchema, SignInSchemaValidator } from '@/lib/validation/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
const SignIn = () => {
	const { auth } = useAuth();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<SignInSchemaValidator>({
		resolver: zodResolver(BaseSchema)
	});
	const navigate = useNavigate();
	const onSubmit = handleSubmit(async (data) => {
		try {
			if (auth !== null && auth.user_status === 'INACTIVE')
				return toast.error('Tu cuenta está inactiva. Por favor, contacta al administrador.', { duration: 2000 });

			if (auth !== null) {
				return toast('Usuario ya registrado', {
					action: {
						label: 'Regresa a Home',
						onClick: () => navigate({ to: '/' })
					}
				});
			}

			const { error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password
			});
			if (error)
				return toast.error('Error en autenticacion', {
					duration: 2000,
					description: 'Credenciales de inicio de sesión inválidas'
				});
			window.location.href = '/';
		} catch (error) {
			console.log(error);
		}
	});
	return (
		<Card className='w-full absolute inset-1/2 [translate:-50%_-50%] max-w-md h-fit'>
			<CardHeader>
				<CardTitle className='text-2xl'>Iniciar sesión</CardTitle>
				<CardDescription>Ingresa tu correo electrónico a continuación para iniciar sesión en tu cuenta</CardDescription>
			</CardHeader>
			<CardContent>
				<form className='grid gap-4' onSubmit={onSubmit}>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Correo electrónico</Label>
						<Input id='email' type='text' placeholder='ejemplo@correo.com' autoComplete='username' {...register('email')} />
						{errors.email !== undefined && <span className='text-sm text-red-600'>{errors.email?.message}</span>}
					</div>
					<div className='grid gap-2'>
						<div className='flex items-center'>
							<Label htmlFor='password'>Contraseña</Label>
						</div>
						<Input id='password' type='password' autoComplete='current-password' placeholder='***-***-**' {...register('password')} />
						{errors.password !== undefined && <span className='text-sm text-red-600'>{errors.password?.message}</span>}
					</div>
					<Button type='submit' className='w-full'>
						Iniciar sesión
					</Button>
				</form>
				<div className='mt-4 text-center text-sm'>
					¿No tienes una cuenta?
					<Link to='/sign-up' className='underline'>
						Regístrate
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};
export default SignIn;
