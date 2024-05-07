import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import supabase from '@/lib/supabase';

export const SignOut = () => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { email, password } = Object.fromEntries(formData.entries());
		try {
			await supabase.auth.signUp({
				email: email.toString(),
				password: password.toString(),
			});
			window.location.href = '/sign-in';
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card className='w-full max-w-sm h-fit m-auto'>
			<CardHeader>
				<CardTitle className='text-xl'>Sign Up</CardTitle>
				<CardDescription>Enter your information to create an account</CardDescription>
			</CardHeader>
			<CardContent>
				<form className='grid gap-4' onSubmit={handleSubmit}>
					<div className='grid grid-cols-2 gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='first-name'>First name</Label>
							<Input id='first-name' name='firstName' placeholder='Max' required />
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='last-name'>Last name</Label>
							<Input id='last-name' name='lastName' placeholder='Robinson' required />
						</div>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input id='email' name='email' type='email' placeholder='m@example.com' required autoComplete='username' />
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='password'>Password</Label>
						<Input id='password' name='password' type='password' autoComplete='current-password' />
					</div>
					<Button type='submit' className='w-full'>
						Create an account
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
