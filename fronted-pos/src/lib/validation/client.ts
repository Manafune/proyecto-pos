import { z } from 'zod';

export const EditClientSchema = z.object({
	LastName: z.string().min(1, { message: 'El Apellido es obligatorio y no puede estar vacío.' }),
	DNI: z.string().regex(/^\d{8}$/, { message: 'El DNI debe contener exactamente 8 dígitos numéricos.' }),
	DateOfBirth: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'La Fecha de Nacimiento debe tener el formato DD/MM/AAAA.' }),
	City: z.string().min(1, 'La Ciudad es obligatoria y no puede estar vacía.'),
	Department: z.string().min(1, 'El Departamento es obligatorio y no puede estar vacío.'),
	Street: z.string().min(1, 'La Calle es obligatoria y no puede estar vacía.')
});
