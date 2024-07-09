import { z } from 'zod';

const today = new Date();

const CustomerSchema = z.object({
	dni: z.string().regex(/^\d{8}$/, { message: 'El DNI debe contener exactamente 8 dígitos numéricos.' }),
	last_name: z.string().min(1, { message: 'El Apellido es obligatorio y no puede estar vacío.' }),
	birth_date: z.date({ message: 'La Fecha de Nacimiento debe tener el formato DD/MM/AAAA.' })
	.max(today, { message: 'La Fecha de Nacimiento no puede ser una fecha futura.' }),
	first_name: z.string({ message: 'El Nombre debe ser texto.' }).min(1, { message: 'El Nombre es obligatorio y no puede estar vacío.' })
});

export const AddressSchema = z.object({
	street: z.string().min(1, { message: 'La Calle es obligatoria y no puede estar vacía.' }),
	city: z.string().min(1, { message: 'La ciudad es obligatoria y no puede estar vacía.' }),
	state: z.string().min(1, { message: 'El departamento es obligatorio y no puede estar vacío.' }),
	customer: CustomerSchema
});
export type AddressMemberSchemaType = z.infer<typeof AddressSchema>;
