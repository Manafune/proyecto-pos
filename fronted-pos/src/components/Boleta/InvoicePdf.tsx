import { Invoice } from '@/types/ticket';
import { Button } from '../ui/button';
import { generatePDF } from './printTicket';

export const InvoicePdf: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
	return (
		<div>
			<Button variant='outline' size='icon' className='overflow-hidden rounded-full' onClick={() => generatePDF(invoice)}>
				<img src='https://imgur.com/3VTic93.jpeg' width={36} height={36} alt='Avatar' className='overflow-hidden rounded-full' />
			</Button>
		</div>
	);
};
