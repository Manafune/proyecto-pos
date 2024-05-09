import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { ProfileSchema, ProfilechemaValidator } from '@/lib/validation/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
export const Settings = () => {
	const { auth } = useAuth();
	const form = useForm<ProfilechemaValidator>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: auth?.user.user_metadata.name ?? '',
			confirmPassword: '',
			password: '',
			status: 'ACTIVE',
			lastname: auth?.user.user_metadata.lastName ?? '',
		},
		mode: 'onChange',
	});
	const onSubmit = (profile: ProfilechemaValidator) => {
		console.log(profile);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input autoComplete='off' placeholder='shadcn' {...field} />
							</FormControl>
							<FormDescription>Este es tu nombre publico. Puede ser real o un pseudonimo.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='lastname'
					render={({ field }) => (
						<FormItem>
							<FormLabel>LastName</FormLabel>
							<FormControl>
								<Input autoComplete='username' placeholder='shadcn' {...field} />
							</FormControl>
							<FormDescription>Modifica tu apellido.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='status'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Estado</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Selecciona el estado de tu cuenta' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='ACTIVE'>Activo</SelectItem>
									<SelectItem value='INACTIVE'>Inactivo</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contraseña</FormLabel>
							<FormControl>
								<Input placeholder='******' type='password' autoComplete='new-password' {...field} />
							</FormControl>
							<FormDescription>Modifica tu contraseña.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirma Contraseña</FormLabel>
							<FormControl>
								<Input placeholder='******' type='password' autoComplete='new-password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Modificar Perfil</Button>
			</form>
		</Form>
	);
};
