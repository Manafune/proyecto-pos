import { ErrorsCustomer } from '@/types/clients';
import { TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AddressMemberSchemaType } from '@/lib/validation/client';

interface ClientsRowBody {
	customer: AddressMemberSchemaType;
	onUpdateCustomer: (params: Partial<AddressMemberSchemaType>) => void;
	errors: ErrorsCustomer;
}
const formatBirthDate = (dateString: string) => {
	if (!dateString) return '';

	const date = new Date(dateString);
	const formattedDate = new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(date);

	return formattedDate;
};
export const ClientsRowBody = ({ customer, onUpdateCustomer, errors }: ClientsRowBody) => {
	const { city, state, street, customer: client } = customer;

	return (
		<TableRow className='grid items-center h-full px-2'>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={'lastName'}>
					Apellido
				</Label>
				<Input
					type='text'
					defaultValue={client?.last_name ?? ''}
					id={'lastName'}
					className={cn('h-auto', { 'border-2 border-red-400 focus-visible:ring-red-700': errors.last_name })}
					onChange={(e) => {
						client !== undefined && onUpdateCustomer({ ...customer, customer: { ...client, last_name: e.target.value } });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor='dni'>
					DNI
				</Label>
				<Input
					type='text'
					defaultValue={client?.dni ?? ''}
					id={'dni'}
					className={cn('h-auto', { 'border-2 border-red-400 focus-visible:ring-red-700': errors.dni })}
					onChange={(e) => {
						client !== undefined && onUpdateCustomer({ ...customer, customer: { ...client, dni: e.target.value } });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={'birth-date'}>
					Fecha de nac.
				</Label>
				<Input
					type='date'
					className={cn('h-auto', { 'border-2 border-red-400 focus-visible:ring-red-700': errors.birth_date })}
					defaultValue={formatBirthDate(client?.birth_date.toString() ?? '')}
					id={`birth-date`}
					onChange={(e) => {
						client !== undefined && onUpdateCustomer({ ...customer, customer: { ...client, birth_date: new Date(e.target.value) } });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={'city'}>
					Ciudad
				</Label>
				<Input
					type='text'
					className={cn('h-auto', { 'border-2 border-red-400 focus-visible:ring-red-700': errors.city })}
					id={'city'}
					defaultValue={city}
					onChange={(e) => {
						client !== undefined && onUpdateCustomer({ ...customer, city: e.target.value, customer: { ...client } });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={'state'}>
					Depto.
				</Label>
				<Input
					type='text'
					className={cn('h-auto', { 'border-2 border-red-400 focus-visible:ring-red-700': errors.state })}
					defaultValue={state ?? ''}
					id={'state'}
					onChange={(e) => {
						client !== undefined && onUpdateCustomer({ ...customer, state: e.target.value, customer: { ...client } });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={'street'}>
					Calle
				</Label>
				<Input
					type='text'
					className={cn('h-auto', { 'border-2 border-red-400 focus-visible:ring-red-700': errors.street })}
					defaultValue={street ?? ''}
					id={'street'}
					onChange={(e) => {
						client !== undefined && onUpdateCustomer({ ...customer, street: e.target.value, customer: { ...client } });
					}}
				></Input>
			</TableCell>
		</TableRow>
	);
};
