import { z } from 'zod';

export const SignOutSchema = z.object({
	name: z.string().min(5, { message: 'El nombre debe tener al menos 5 caracteres' }),
	password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
	dni: z.string().length(8, { message: 'El DNI debe tener 8 caracteres' }),
	email: z.string().min(1, { message: 'Este campo no debe estar vacio.' }).email('This is not a valid email.'),
});

export type SignOutSchemaValidator = z.infer<typeof SignOutSchema>;
