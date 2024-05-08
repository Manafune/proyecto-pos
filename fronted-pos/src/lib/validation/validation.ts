import { z } from 'zod';
export const BaseSchema = z.object({
	email: z.string().min(1, { message: 'Este campo no debe estar vacio.' }).email('No es un email valido.'),
	password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});
export const SignOutSchema = BaseSchema.extend({
	name: z.string().min(5, { message: 'El nombre debe tener al menos 5 caracteres' }),
	dni: z.string().length(8, { message: 'El DNI debe tener 8 caracteres' }),
});
export const ProfileSchema = SignOutSchema.extend({
	status: z.enum(['ACTIVE', 'INACTIVE']),
});
export type SignInSchemaValidator = z.infer<typeof BaseSchema>;
export type ProfilechemaValidator = z.infer<typeof ProfileSchema>;
export type SignOutSchemaValidator = z.infer<typeof SignOutSchema>;
