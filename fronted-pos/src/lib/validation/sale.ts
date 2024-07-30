import { z } from 'zod';

export const ValidateSalesDni = z.object({
	dni: z.string().regex(/^\d{8}$/, { message: 'El DNI debe contener exactamente 8 dígitos numéricos.' })
});
export const ValidateSalesName = z.object({
	name: z.string().min(1, { message: 'El nombre del producto es obligatorio y no puede estar vacío.' })
});

