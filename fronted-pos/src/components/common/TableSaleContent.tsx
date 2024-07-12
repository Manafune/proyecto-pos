import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { type SaleData, SaleStatus } from '@/types/sales';
import { putSalesByState } from '@/lib/sales/putSales';
import { useRouter } from '@tanstack/react-router';
import { generatePDF } from '../Boleta/printTicket';
import { getSaleById } from '@/lib/sales/getSales';
import { Invoice } from '@/types/ticket';
import { updateProductStock } from '@/lib/products/putProducts';
interface TypeTableContent {
	sales: SaleData[];
}

export const TableSaleContent = ({ sales }: TypeTableContent) => {
	const route = useRouter();
	const getStatusText = (status: SaleStatus) => (status === SaleStatus.COMPLETED ? 'Completa' : 'Cancelada');

	const handlePrintInvoice = async (id: number) => {
		try {
			const sale = await getSaleById(id);
			if (!sale || !sale.detail_sale) {
				console.error('No sale or detail_sale data available');
				return;
			}

			const invoice: Invoice = {
				date: new Date(sale.sale_date).toLocaleDateString(),
				customer: sale.customer.first_name + ' ' + sale.customer.last_name,
				products: sale.detail_sale.map((detail) => ({
					name: detail.products.name,
					quantity: detail.quantity,
					price: detail.price,
					subtotal: detail.subtotal
				})),
				total: sale.total
			};

			generatePDF(invoice); // Llama a la función directamente para generar el PDF y abrir la ventana
		} catch (error) {
			console.error('Error printing invoice:', error);
		}
	};

	const handleChangeStatus = async (sale: SaleData) => {
		const confirmChange = window.confirm('¿Estás seguro de cambiar el estado?');

		if (confirmChange) {
			try {
				await putSalesByState({
					status: sale.status === SaleStatus.COMPLETED ? SaleStatus.CANCELED : SaleStatus.COMPLETED,
					idSale: sale.id
				});
				const updatedSaleDetails = await getSaleById(sale.id);
				if (updatedSaleDetails) {
					for (const detail of updatedSaleDetails.detail_sale) {
						const { products, quantity } = detail;
						const newStock = sale.status === SaleStatus.COMPLETED ? products.stock + quantity : products.stock - quantity;

						await updateProductStock({ idProduct: products.id, newStock });

						console.log(`Stock actualizado para ${products.name}: ${newStock}`);
					}
				}
				route.invalidate();
			} catch (error) {
				console.error('Error cambiando estado o actualizando stock:', error);
			}
		}
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Cliente</TableHead>
					<TableHead>Fecha de Venta</TableHead>
					<TableHead className='hidden md:table-cell'>Total</TableHead>
					<TableHead className='hidden md:table-cell'>Estado</TableHead>
					<TableHead>
						<span className='sr-only'>Acciones</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{sales?.map((sale) => (
					<TableRow key={sale.id} className={sale.id % 2 === 0 ? '' : 'bg-slate-200/70 hover:bg-slate-200/70'}>
						<TableCell className='hidden md:table-cell'>
							{sale.customer.first_name} {sale.customer.last_name}
						</TableCell>
						<TableCell className='hidden md:table-cell'>{new Date(sale.sale_date).toLocaleDateString()}</TableCell>
						<TableCell className='hidden md:table-cell'>{sale.total}</TableCell>
						<TableCell>
							<Badge variant={sale?.status === SaleStatus.COMPLETED ? 'outline' : 'secondary'} className='border-none bg-blue-200'>
								{sale ? getStatusText(sale.status) : ''}
							</Badge>
						</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button aria-haspopup='true' size='icon' variant='ghost'>
										<MoreHorizontal className='h-4 w-4' />
										<span className='sr-only'>Toggle menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuLabel>Acciones</DropdownMenuLabel>
									<DropdownMenuItem className="rounded bg-yellow-300 text-black px-4 py-2 hover:bg-yellow-400 hover:text-black" onClick={() => handleChangeStatus(sale)}>Cambiar Estado</DropdownMenuItem>
									<DropdownMenuItem className="rounded mt-2 bg-lime-300 text-black px-4 py-2 hover:bg-lime-400 hover:text-black"onClick={() => handlePrintInvoice(sale.id)}>Imprimir Boleta</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
