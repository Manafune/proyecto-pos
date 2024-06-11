import { AddressByCustomer } from '@/types/clients';
import { TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ClientsRowBody {
	customer: AddressByCustomer;
	onUpdateCustomer: (params: Partial<AddressByCustomer>) => void;
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

export const ClientsRowBody = ({ customer, onUpdateCustomer }: ClientsRowBody) => {
	const { city, state, street, customer: client, id } = customer;
	// console.log(client.)
	//
	return (
		<TableRow className='grid items-center h-full px-2'>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={`${'lastName-'}${id}`}>
					Apellido
				</Label>
				<Input
					type='text'
					defaultValue={client?.last_name ?? ''}
					id={`${'lastName-'}${id}`}
					className='h-auto'
					onChange={(e) => {
						client !== undefined && onUpdateCustomer({ ...customer, customer: { ...client, last_name: e.target.value } });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={`${'dni-'}${id}`}>
					DNI
				</Label>
				<Input
					type='text'
					className='h-auto'
					defaultValue={client?.dni ?? ''}
					id={`${'dni-'}${id}`}
					onChange={(e) => {
						client !== undefined && onUpdateCustomer({ ...customer, customer: { ...client, dni: e.target.value } });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={`${'birth-date-'}${id}`}>
					Fecha de nac.
				</Label>
				<Input
					type='date'
					className='h-auto'
					defaultValue={formatBirthDate(client?.birth_date ?? '')}
					id={`birth-date-${id}`}
					onChange={(e) => {
						client !== undefined && onUpdateCustomer({ ...customer, customer: { ...client, birth_date: e.target.value } });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={`${'city-'}${id}`}>
					Ciudad
				</Label>
				<Input
					type='text'
					className='h-auto'
					id={`${'city-'}${id}`}
					defaultValue={city}
					onChange={(e) => {
						onUpdateCustomer({ city: e.target.value });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={`${'state-'}${id}`}>
					Depto.
				</Label>
				<Input
					type='text'
					className='h-auto'
					defaultValue={state ?? ''}
					id={`${'state-'}${id}`}
					onChange={(e) => {
						onUpdateCustomer({ state: e.target.value });
					}}
				></Input>
			</TableCell>
			<TableCell className='p-0'>
				<Label className='sr-only' htmlFor={`${'street-'}${id}`}>
					Calle
				</Label>
				<Input
					type='text'
					className='min-w-max h-auto'
					defaultValue={street ?? ''}
					id={`${'street-'}${id}`}
					onChange={(e) => {
						onUpdateCustomer({ street: e.target.value });
					}}
				></Input>
			</TableCell>
		</TableRow>
	);
};
