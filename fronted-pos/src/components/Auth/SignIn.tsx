import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import supabase from '@/lib/supabase';
import { Link } from '@tanstack/react-router';
export const SignIn = () => {
	const { auth } = useAuth();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { email, password } = Object.fromEntries(formData.entries());
		try {
			if (auth !== null) {
				alert('si');
			} else {
				await supabase.auth.signInWithPassword({
					email: email.toString(),
					password: password.toString(),
				});
				window.location.href = '/';
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Card className='w-full max-w-sm h-fit m-auto'>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
			</CardHeader>
			<CardContent>
				<form className='grid gap-4' onSubmit={handleSubmit}>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input id='email' name='email' type='email' placeholder='m@example.com' required autoComplete='username' />
					</div>
					<div className='grid gap-2'>
						<div className='flex items-center'>
							<Label htmlFor='password'>Password</Label>
						</div>
						<Input id='password' name='password' type='password' required autoComplete='current-password' />
					</div>
					<Button type='submit' className='w-full'>
						Login
					</Button>
				</form>
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link to='/sign-out' className='underline'>
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};
