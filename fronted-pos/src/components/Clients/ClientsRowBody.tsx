import { AddressCustomer } from '@/types/clients';
import { TableCell, TableRow } from '../ui/table';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface ClientsRowBody {
	customer: AddressCustomer;
}
export const ClientsRowBody = ({ customer }: ClientsRowBody) => {
	const { city, state, street, customer: customerNew, id } = customer;
	const client = customerNew?.[0];
	console.log(client);

	return (
		<TableRow key={id}>
			<TableCell>
				<Label className='sr-only' htmlFor={`${'lastName-'}${id}`}>
					Apellido
				</Label>
				<Input type='text' defaultValue={client?.last_name ?? ''} id={`${'lastName-'}${id}`}></Input>
			</TableCell>
			<TableCell>
				<Label className='sr-only' htmlFor={`${'dni-'}${id}`}>
					DNI
				</Label>
				<Input type='text' defaultValue={client?.dni ?? ''} id={`${'dni-'}${id}`}></Input>
			</TableCell>
			<TableCell>
				<Label className='sr-only' htmlFor={`${'birth-date-'}${id}`}>
					Fecha de nac.
				</Label>
				<Input type='date' defaultValue={client?.birth_date ? new Date(client.birth_date).toISOString().split('T')[0] : ''} id={`birth-date-${id}`}></Input>
			</TableCell>
			<TableCell>
				<Label className='sr-only' htmlFor={`${'city-'}${id}`}>
					Ciudad
				</Label>
				<Input type='text' id={`${'city-'}${id}`} defaultValue={city}></Input>
			</TableCell>
			<TableCell>
				<Label className='sr-only' htmlFor={`${'state-'}${id}`}>
					Depto.
				</Label>
				<Input type='text' defaultValue={state ?? ''} id={`${'state-'}${id}`}></Input>
			</TableCell>
			<TableCell>
				<Label className='sr-only' htmlFor={`${'street-'}${id}`}>
					Calle
				</Label>
				<Input type='text' className='min-w-max' defaultValue={street ?? ''} id={`${'street-'}${id}`}></Input>
			</TableCell>
		</TableRow>
	);
};
