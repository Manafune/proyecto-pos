import { useSalesStore } from '@/hooks/useSales';
import { Button } from '../ui/button';
import { insertSaleAndDetails } from '@/lib/sales/addSale';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { SalesPagination } from '@/routes/_authenticated/(sales)/sales';
import { useState } from 'react';
import { Loader } from 'lucide-react';

export const SalesSummary = ({ total }: { total: number }) => {
	const navigate = useNavigate({ from: '/sales/' });
	const router = useRouter();
	const { onResetSales, storeSales } = useSalesStore();
	const { client, products } = storeSales;
	const [isLoading, setIsLoading] = useState(false);
	const formatCurrency = (value: number) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);


	const handleGenerateSaleDetails = async () => {
		if (!client) return;
		setIsLoading(true);
		try {
			const saleDetails = products.map((product) => ({ product_id: product.id, quantity: product.quantity, price: product.price }));
			await insertSaleAndDetails({ sale: { id_customer: client.id, total }, saleDetails });
			router.invalidate();
			navigate({
				to: '/sales',
				search: (searchParams) => {
					const prevSearchParams = searchParams as SalesPagination;
					return { ...prevSearchParams, current: 1 };
				}
			});
		} catch (error) {
			console.error('Error generating sale details:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='grid grid-cols-[50%_1fr_1fr] mb-6'>
			<p className='text-lg font-medium text-gray-700'>Total: {formatCurrency(total)}</p>
			<Button
				type='button'
				className='bg-green-600 gap-2 text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
				onClick={handleGenerateSaleDetails}
				disabled={isLoading}
			>
				{isLoading && <Loader className='animate-spin' />}
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
