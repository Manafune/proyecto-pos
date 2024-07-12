import { useSalesStore } from '@/hooks/useSales';
import { Button } from '../ui/button';

export const SalesSummary = ({ total }: { total: number }) => {
	const { onResetSales } = useSalesStore();
	const formatCurrency = (value: number) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
	return (
		<div className='grid grid-cols-[50%_1fr_1fr] mb-6'>
			<p className='text-lg font-medium text-gray-700'>Total: {formatCurrency(total)}</p>
			<Button type='button' className='bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
				Generar Venta
			</Button>
			<Button
				type='button'
				className='ml-2 bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				onClick={onResetSales}
			>
				Cancelar
			</Button>
		</div>
	);
};
