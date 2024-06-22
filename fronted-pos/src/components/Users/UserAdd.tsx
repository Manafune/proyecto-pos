import { MemberRole } from '@/types/members';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { stepUsers } from '@/data/steps';
import {useSignUp} from "@/hooks/useSignUp"



export const UserAdd = () => {
  const {onSubmit,errors,register}=useSignUp()
	const handleSubmit = async(data: React.FormEvent<HTMLFormElement>) => {
		await onSubmit(data)
	}
	return (
		<div className='p-8 bg-gray-50 min-h-screen flex justify-center items-center'>
			<div className='max-w-6xl w-full'>
				<div className='grid gap-8 md:grid-cols-[1fr_300px] lg:grid-cols-3 lg:gap-8'>
					<div className='grid auto-rows-max items-start gap-8 lg:col-span-2'>
						<Card className='p-6'>
							<CardHeader>
								<CardTitle className='text-2xl'>Añadir Usuario</CardTitle>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div>
										<Label htmlFor='email'>Correo Electrónico:</Label>
										<Input
											id='email'
											type='email'
                      placeholder='ejemplo@gmail.com'
                      autoComplete='email'
                      {...register('email')}
											className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50'
										/>
                    {errors.email !== undefined && <span className='text-sm text-red-600'>{errors.email.message}</span>}
									</div>
									<div>
										<Label htmlFor='name'>Nombre:</Label>
										<Input
											id='name'
											type='text'
                      autoComplete='name'
											placeholder='Nombre'
                      {...register('name')}
											className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50'
										/>
                    {errors.name !== undefined && <span className='text-sm text-red-600'>{errors.name.message}</span>}
									</div>
									<div>
										<Label htmlFor='lastName'>Apellido:</Label>
										<Input
											id='lastname'
											type='text'
											placeholder='Apellido'
                      {...register('lastname')}
											className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50'
										/>
                    {errors.lastname !== undefined && <span className='text-sm text-red-600'>{errors.lastname.message}</span>}
									</div>
									<div>
										<Label htmlFor='password'>Contraseña:</Label>
										<Input
											id='password'
											type='password'
											autoComplete='current-password'
											placeholder='**********'
                      {...register('password')}
											className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50'
										/>
                    {errors.password !== undefined && <span className='text-sm text-red-600'>{errors.password?.message}</span>}
									</div>
									<div>
										<Label htmlFor='role'>Rol:</Label>
										<Select {...register('role', { required: 'Debe seleccionar un rol' })}>
											<SelectTrigger className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50'>
												<SelectValue placeholder='Seleccionar Rol' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value={MemberRole.MEMBER}>Miembro</SelectItem>
												<SelectItem value={MemberRole.OTRO_ROL}>Admin</SelectItem>
												<SelectItem value={MemberRole.SELLER}>Vendedor</SelectItem>
												<SelectItem value={MemberRole.STOREKEEPER}>Almacenero</SelectItem>
											</SelectContent>
										</Select>
                    {errors.role && <span className='text-sm text-red-600'>{errors.role.message}</span>}
									</div>
									<div className='md:col-span-2'>
										<Button type='submit' className='w-full py-3 text-lg'>
											Añadir Usuario
										</Button>
									</div>
								</form>
							</CardContent>
						</Card>
					</div>
					<Card className='p-6'>
						<CardHeader>
							<CardTitle className='text-2xl'>¿Cómo Añadir Usuarios?</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className='space-y-6'>
								{stepUsers.map((step, index) => (
									<li key={index} className='flex items-start space-x-4'>
										<span className='flex-shrink-0 h-12 w-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg'>
											{index + 1}
										</span>
										<div>
											<h4 className='text-lg font-medium'>{step.title}</h4>
											<p className='text-gray-600'>{step.description}</p>
										</div>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default UserAdd;
