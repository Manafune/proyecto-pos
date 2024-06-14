import { z } from 'zod';

const CustomerSchema = z.object({
	id: z.number({ message: 'El ID debe ser numérico y mayor a cero' }).min(1, { message: 'El ID debe ser mayor a cero' }),
	dni: z.string().regex(/^\d{8}$/, { message: 'El DNI debe contener exactamente 8 dígitos numéricos.' }),
	last_name: z.string().min(1, { message: 'El Apellido es obligatorio y no puede estar vacío.' }),
	birth_date: z.date({ message: 'La Fecha de Nacimiento debe tener el formato DD/MM/AAAA.' }),
	first_name: z.string({ message: 'El Nombre debe ser texto.' }).min(1, { message: 'El Nombre es obligatorio y no puede estar vacío.' })
});

export const AddressSchema = z.object({
	id: z.number({ message: 'El id debe ser numerico' }).min(0, { message: 'El id debe ser mayor a cero' }),
	street: z.string().min(1, { message: 'La Calle es obligatoria y no puede estar vacía.' }),
	city: z.string().min(1, { message: 'La ciudad es obligatoria y no puede estar vacía.' }),
	state: z.string().min(1, { message: 'El departamento es obligatorio y no puede estar vacío.' }),
	customer: CustomerSchema
});

export type AddressMemberSchemaType = z.infer<typeof AddressSchema>;
//
