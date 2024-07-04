import { test, expect } from '@playwright/test';
import { getAllSales, getSaleById } from '../src/lib/sales/getSales';
import { putSalesByState } from '../src/lib/sales/putSales'

const mockSales = [
    {
        id: 4,
        customer: { first_name: 'Marco', last_name: 'Perez' },
        sale_date: '2024-06-28T10:00:00+00:00',
        total: 42.30,
        status: 'COMPLETED',
        detail_sale: [
            {
                products: { name: 'HUEVOS' },
                quantity: 2,
                price: 18,
                subtotal: 36
            },
            {
                products: { name: 'CAJA DE ARROZ' },
                quantity: 3,
                price: 2.10,
                subtotal: 6.30
            }
        ]
    },
    {
        id: 1,
        customer: { first_name: 'Carla', last_name: 'Lopez' },
        sale_date: '2024-05-30T10:30:00+00:00',
        total: 75,
        status: 'COMPLETED',
        detail_sale: [
            {
                products: { name: 'LECHE GLORIA 395G' },
                quantity: 2,
                price: 10.5,
                subtotal: 21
            },
            {
                products: { name: 'Arroz Costeño 500 G' },
                quantity: 4,
                price: 10.5,
                subtotal: 42
            }
        ]
    }
];

class SupabaseSalesTests {
    mockData = mockSales;

    async obtenerVentaPorId(id: number) {
        const saleEqual = this.mockData.find((data) => data.id === id);
        const result = await getSaleById(id);
        expect(result).toMatchObject(saleEqual);
    }

    async obtenerVentasYTamano(current: number, pageSize: number) {
        const startIndex = (current - 1) * pageSize;
        const expectedSubset = this.mockData.slice(startIndex, startIndex + pageSize);

        const result = await getAllSales({ current, pageSize });

        expect(result.length).toBe(pageSize);

        expectedSubset.forEach((expectedItem, index) => {
            expect(result[index]).toMatchObject(expectedItem);
        });
    }

    async actualizarEstadoVenta(idSale: number, status: 'COMPLETED' | 'CANCELED') {
        const result = await putSalesByState({ status, idSale });
        expect(result[0].status).toBe(status);
    }
}

const supabaseSalesTests = new SupabaseSalesTests();

test.describe('API Supabase para ventas', () => {
    test('Obtener venta por ID', async () => {
        const id = 1;
        await supabaseSalesTests.obtenerVentaPorId(id);
    });

    test('Obtener ventas y tamaño', async () => {
        const current = 1;
        const pageSize = 2;
        await supabaseSalesTests.obtenerVentasYTamano(current, pageSize);
    });

    test.only('Actualizar estado de venta', async () => {
        const idSale = 1;
        const status = 'COMPLETED';
        await supabaseSalesTests.actualizarEstadoVenta(idSale, status);
    });
});
