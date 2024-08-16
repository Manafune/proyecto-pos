import { test, expect } from '@playwright/test';
import { getAllClients, getClientById } from '../src/lib/clients/getClient';
import { addClient } from '../src/lib/clients/addClient';

const mock = [
	{
		id: 2,
		street: 'Calle las Garmendias 123',
		city: 'Lima',
		state: 'Lima',
		customer: [
			{
				id: 3,
				dni: '07154878',
				last_name: 'Smith',
				birth_date: '1985-10-18',
				first_name: 'Pedro'
			}
		]
	},
	{
		id: 19,
		street: '155 Main St',
		city: 'Lima',
		state: 'Lima',
		customer: [
			{
				id: 19,
				dni: '45815236',
				last_name: 'Tapia',
				birth_date: '2003-04-01',
				first_name: 'Mary'
			}
		]
	}
];

class SupabaseTests {
	mockData = mock;

	async obtenerClientePorId(id, timeout) {
		const addressEqual = this.mockData.find((data) => data.id === parseInt(id));
		const customer = addressEqual?.customer[0];
		const mockEqual = {
			...addressEqual,
			customer: { ...customer }
		};
		const result = await getClientById({ id, timeout });
		expect(result).toMatchObject(mockEqual);
	}

	async obtenerClientesYTamano(current, pageSize) {
		const startIndex = (current - 1) * pageSize;
		const expectedSubset = this.mockData.slice(startIndex, startIndex + pageSize);

		const result = await getAllClients({ current, pageSize });

		expect(result.length).toBe(pageSize);

		expectedSubset.forEach((expectedItem, index) => {
			expect(result[index]).toMatchObject(expectedItem);
		});
	}
}

const supabaseTests = new SupabaseTests();

test.describe('api supabase para datos', () => {
	test('obtener cliente por ID', async () => {
		const id = '3';
		const { timeout } = AbortSignal;
		await supabaseTests.obtenerClientePorId(id, timeout);
	});

	test('Obtener Clientes y tamaño', async () => {
		const current = 1;
		const pageSize = 2;
		await supabaseTests.obtenerClientesYTamano(current, pageSize);
	});
	test('añadir cliente', async () => {
		const mockClient = {
			street: '155 Main St',
			city: 'Lima',
			state: 'Lima',
			customer: {
				dni: '45815236',
				first_name: 'Melani',
				last_name: 'Tapia',
				birth_date: new Date('2003-04-02')
			}
		};
		const newClient = await addClient({ client: mockClient });
		expect(newClient).toBe(true);
	});
});
