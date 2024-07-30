import { expect } from "chai";
import { z } from 'zod';
import { describe, it } from "mocha";

// Test para las validaciones de ventas
describe("SALES VALIDATION TESTS", () => {
    const ValidateSalesDni = z.object({
        dni: z.string().regex(/^\d{8}$/, { message: 'El DNI debe contener exactamente 8 dígitos numéricos.' })
    });
    const ValidateSalesName = z.object({
        name: z.string().min(1, { message: 'El nombre del producto es obligatorio y no puede estar vacío.' })
    });
    
    
    // Test para la validación del DNI
    describe("ValidateSalesDni", () => {
        it('VT1 - DNI válido con exactamente 8 dígitos', () => {
            const validDniData = { dni: '12345678' };
            const result = ValidateSalesDni.safeParse(validDniData);
            expect(result.success).to.be.true;
        });

        it('VT2 - DNI con menos de 8 dígitos', () => {
            const invalidDniData = { dni: '1234567' };
            const result = ValidateSalesDni.safeParse(invalidDniData);
            expect(result.success).to.be.false;
            expect(result.error.errors[0].message).to.equal('El DNI debe contener exactamente 8 dígitos numéricos.');
        });

        it('VT3 - DNI con más de 8 dígitos', () => {
            const invalidDniData = { dni: '123456789' };
            const result = ValidateSalesDni.safeParse(invalidDniData);
            expect(result.success).to.be.false;
            expect(result.error.errors[0].message).to.equal('El DNI debe contener exactamente 8 dígitos numéricos.');
        });

        it('VT4 - DNI con caracteres no numéricos', () => {
            const invalidDniData = { dni: '1234abcd' };
            const result = ValidateSalesDni.safeParse(invalidDniData);
            expect(result.success).to.be.false;
            expect(result.error.errors[0].message).to.equal('El DNI debe contener exactamente 8 dígitos numéricos.');
        });
    });

    // Test para la validación del nombre
    describe("ValidateSalesName", () => {
        it('VT5 - Nombre válido no vacío', () => {
            const validNameData = { name: 'Producto Válido' };
            const result = ValidateSalesName.safeParse(validNameData);
            expect(result.success).to.be.true;
        });

        it('VT6 - Nombre vacío', () => {
            const invalidNameData = { name: '' };
            const result = ValidateSalesName.safeParse(invalidNameData);
            expect(result.success).to.be.false;
            expect(result.error.errors[0].message).to.equal('El nombre del producto es obligatorio y no puede estar vacío.');
        });
    });
});
