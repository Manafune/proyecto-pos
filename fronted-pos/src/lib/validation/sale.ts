import { z } from 'zod';

export const ValidateSalesDni = z.object({
	dni: z.string().regex(/^\d{8}$/, { message: 'El DNI debe contener exactamente 8 dígitos numéricos.' })
});
export const ValidateSalesName = z.object({
	name: z.string().min(1, { message: 'El nombre del producto es obligatorio y no puede estar vacío.' })
});

// const ProductSchema = z.object({
// 	name: z.string().min(1, { message: 'El nombre del producto es obligatorio y no puede estar vacío.' }),
// 	quantity: z.number().min(1, { message: 'La cantidad debe ser al menos 1.' }),
// 	price: z.number().min(1, { message: 'El precio debe ser al menos 1.' }),
// 	subtotal: z.number().min(1, { message: 'El subtotal debe ser al menos 1.' })
// });

// const CustomerSchema = z.object({
// 	dni: z.string().regex(/^\d{8}$/, { message: 'El DNI debe contener exactamente 8 dígitos numéricos.' }),
// 	last_name: z.string().min(1, { message: 'El Apellido es obligatorio y no puede estar vacío.' }),
// 	first_name: z.string().min(1, { message: 'El Nombre es obligatorio y no puede estar vacío.' })
// });

// const SaleSchema = z.object({
// 	customer: CustomerSchema.nullable().refine((val) => val !== null, {
// 		message: 'El cliente es obligatorio y no puede estar vacío.'
// 	}),
// 	products: z.array(ProductSchema).min(1, { message: 'Debe haber al menos un producto en la venta.' }),
// 	total: z.number().min(1, { message: 'El total debe ser mayor a 0.' })
// });

// export type SaleSchemaType = z.infer<typeof SaleSchema>;

// export { SaleSchema, ProductSchema };
