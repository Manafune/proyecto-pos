import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import supabase from '@/lib/supabase';
import { SignOutSchema, type SignOutSchemaValidator } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
const SignOut = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignOutSchemaValidator>({
		resolver: zodResolver(SignOutSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			await supabase.auth.signUp({
				email: data.email,
				password: data.password,
				options: {
					data: {
						name: data.name,
						dni: data.dni,
					},
				},
			});
			window.location.href = '/sign-in';
		} catch (error) {
			console.log(error);
		}
	});
	return (
		<Card className='w-full absolute inset-1/2 [translate:-50%_-50%] max-w-md h-fit'>
			<CardHeader>
				<CardTitle className='text-xl'>Sign Up</CardTitle>
				<CardDescription>Enter your information to create an account</CardDescription>
			</CardHeader>
			<CardContent>
				<form className='grid gap-4' onSubmit={onSubmit}>
					<div className='grid gap-2'>
						<Label htmlFor='name'> Name</Label>
						<Input id='name' placeholder='Max' {...register('name')} />
						{errors.name !== undefined && <span className='text-sm text-red-600'>{errors.name.message}</span>}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='dni'>DNI</Label>
						<Input id='dni' placeholder='********' {...register('dni')} />
						{errors.dni !== undefined && <span className='text-sm text-red-600'>{errors.dni.message}</span>}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input id='email' type='email' placeholder='m@example.com' autoComplete='username' {...register('email')} />
						{errors.email !== undefined && <span className='text-sm text-red-600'>{errors.email.message}</span>}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='password'>Password</Label>
						<Input id='password' type='password' autoComplete='current-password' {...register('password')} />
						{errors.password !== undefined && <span className='text-sm text-red-600'>{errors.password?.message}</span>}
					</div>
					<Button type='submit' className='w-full'>
						Create an account
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
export default SignOut;
