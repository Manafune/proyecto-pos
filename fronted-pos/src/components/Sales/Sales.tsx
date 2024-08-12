import { PlusCircle, File, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Link, useNavigate } from '@tanstack/react-router';
import { type SalesPagination } from '@/routes/_authenticated/(sales)/sales';
import { TableSale } from '../Table/TableSale';
import { useEffect, useState } from 'react';
import { getAllSales } from '@/lib/sales/getSales';
import { type SaleData } from '@/types/sales';
import { generatePDF } from '@/utils/sales/pdfAllSales';
import { exportToExcel } from '@/utils/sales/excelAllSales';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const Sales = () => {
	const navigate = useNavigate({ from: '/sales' });
	const [sales, setSales] = useState<SaleData[]>([]);
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');

	const validateDateRange = (start: string, end: string) => {
        if (start && end && new Date(start) > new Date(end)) {
            alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
			setStartDate('');
            setEndDate('');
            return false;
        }
        return true;
    };
	
	useEffect(() => {
        const fetchSales = async () => {
            // Si no se han seleccionado fechas, obtener el mes anterior
            let selectedStartDate = startDate;
            let selectedEndDate = endDate;

            if (!startDate && !endDate) {
                const now = new Date();
                const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                selectedStartDate = firstDayOfLastMonth.toISOString().split('T')[0];
                selectedEndDate = lastDayOfLastMonth.toISOString().split('T')[0];
            }

            const salesData = await getAllSales({
                current: 1,
                pageSize: 100,
                filter: 'ALL',
                startDate: selectedStartDate,
                endDate: selectedEndDate
            });
            setSales(salesData);
        };

        if (validateDateRange(startDate, endDate)) {
            fetchSales();
        }
    }, [startDate, endDate]);

	return (
		<Tabs defaultValue='all'>
			<div className='flex items-center'>
				<Select
					defaultValue='ALL'
					onValueChange={(val) => {
						navigate({
							to: '/sales',
							search: (res) => ({
								...res,
								filter: val as SalesPagination['filter']
							})
						});
					}}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select a fruit' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='ALL'>Todos</SelectItem>
						<SelectItem value='COMPLETED'>Completados</SelectItem>
						<SelectItem value='CANCELED'>Cancelados</SelectItem>
					</SelectContent>
				</Select>
				<div className='ml-auto flex items-center gap-2'>
					<input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder='Fecha inicio' />
					<input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder='Fecha de Fin' />
					<Button size='sm' variant='outline' className='h-8 bg-[#0ea5e9] hover:bg-[#38bdf8] gap-1' onClick={() => generatePDF(sales)}>
						<File className='h-3.5 w-3.5 text-white' />
						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap text-white'>Exportar PDF</span>
					</Button>
					<Button size='sm' variant='outline' className='h-8 bg-[#34d399] hover:bg-[#4ade80] gap-1' onClick={() => exportToExcel(sales)}>
						<Download className='h-3.5 w-3.5 text-white' />
						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap text-white'>Exportar Excel</span>
					</Button>
					<Link
						className='h-8 gap-1 text-sm bg-[#10b981] hover:bg-[#34d399] text-white flex flex-row items-center p-[0.5em] rounded-[0.5em]'
						to='/sales/add'
						search={(prev) => {
							const data = prev as SalesPagination;
							return { ...data };
						}}
					>
						<PlusCircle className='h-3.5 w-3.5' />
						<span className='sr-only leading-none sm:not-sr-only sm:whitespace-nowrap'>Nueva Venta</span>
					</Link>
				</div>
			</div>
			<TableSale />
		</Tabs>
	);
};
