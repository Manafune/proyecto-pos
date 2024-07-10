import { z } from 'zod';

export const ProductSchema = z.object({
	name: z
		.string()
		.min(4, { message: 'El nombre del producto debe tener al menos 4 caracteres' })
		.max(100, { message: 'El nombre del producto no puede ser mayor a 100 caracteres' }),
	stock: z
		.number()
		.int({ message: 'El stock debe ser un número entero' })
		.positive({ message: 'El stock debe ser un número positivo' }),
    price: z
		.number()
		.positive({ message: 'El precio debe ser un número positivo' })
});
