import { expect } from "chai";
import { z } from 'zod';
import { describe, it } from "mocha";

// Schemas
const ProductSchema = z.object({
    name: z.string()
        .min(4, { message: 'El nombre del producto debe tener al menos 4 caracteres' })
        .max(100, { message: 'El nombre del producto no puede ser mayor a 100 caracteres' })
});

const ProductPriceStockSchema = z.object({
    stock: z.number().int({ message: 'El stock debe ser un número entero' }).positive({ message: 'El stock debe ser un número positivo' }),
    price: z.number().positive({ message: 'El precio debe ser mayor a 0' })
});

const CombinedProductSchema = ProductSchema.merge(ProductPriceStockSchema);

// Tests
describe("PRODUCT TEST", () => {
    
    it('PT1 - Define longitud entre 4 y 100 caracteres', () => {
        const validProductData = {
            name: 'Producto de Prueba',
            stock: 10,
            price: 100.0
        };
        const result = CombinedProductSchema.safeParse(validProductData);
        expect(result.success).to.be.true;
    });

    it('PT2 - Nombre del producto demasiado corto', () => {
        const invalidProductData = {
            name: 'Pro',
            stock: 10,
            price: 100.0
        };
        const result = CombinedProductSchema.safeParse(invalidProductData);
        expect(result.success).to.be.false;
        expect(result.error.errors[0].message).to.equal('El nombre del producto debe tener al menos 4 caracteres');
    });

    it('PT3 - Nombre del producto demasiado largo', () => {
        const invalidProductData = {
            name: 'Producto de Prueba con un nombre extremadamente largo que excede el límite permitido de caracteres para poder probar su funcionalidad de manera correcta y envie el error al usuario',
            stock: 10,
            price: 100.0
        };
        const result = CombinedProductSchema.safeParse(invalidProductData);
        expect(result.success).to.be.false;
        expect(result.error.errors[0].message).to.equal('El nombre del producto no puede ser mayor a 100 caracteres');
    });

    it('PT4 - Stock del producto no es un entero', () => {
        const invalidProductData = {
            name: 'Producto de Prueba',
            stock: 10.5,
            price: 100.0
        };
        const result = CombinedProductSchema.safeParse(invalidProductData);
        expect(result.success).to.be.false;
        expect(result.error.errors[0].message).to.equal('El stock debe ser un número entero');
    });

    it('PT5 - Stock del producto no es positivo', () => {
        const invalidProductData = {
            name: 'Producto de Prueba',
            stock: -5,
            price: 100.0
        };
        const result = CombinedProductSchema.safeParse(invalidProductData);
        expect(result.success).to.be.false;
        expect(result.error.errors[0].message).to.equal('El stock debe ser un número positivo');
    });

    it('PT6 - Precio del producto no es mayor a 0', () => {
        const invalidProductData = {
            name: 'Producto de Prueba',
            stock: 10,
            price: 0
        };
        const result = CombinedProductSchema.safeParse(invalidProductData);
        expect(result.success).to.be.false;
        expect(result.error.errors[0].message).to.equal('El precio debe ser mayor a 0');
    });

});
