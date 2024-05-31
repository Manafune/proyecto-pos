import { z } from 'zod';
export const BaseSchema = z.object({
	email: z.string().trim().min(1, { message: 'Este campo no debe estar vacio.' }).email('No es un email valido.'),
	password: z.string().trim().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
});
export const SignOutSchema = BaseSchema.extend({
	name: z.string().trim().min(5, { message: 'El nombre debe tener al menos 5 caracteres' }),
	lastname: z.string().trim().min(5, { message: 'El apellido debe tener al menos 5 caracteres' })
});
export const ProfileSchema = SignOutSchema.omit({ email: true })
	.extend({
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Las contreseñas debe coincidir.',
		path: ['confirmPassword']
	});
export type SignInSchemaValidator = z.infer<typeof BaseSchema>;
export type ProfilechemaValidator = z.infer<typeof ProfileSchema>;
export type SignOutSchemaValidator = z.infer<typeof SignOutSchema>;
