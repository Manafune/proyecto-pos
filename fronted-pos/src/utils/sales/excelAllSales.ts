import * as XLSX from 'xlsx';
import { type SaleData } from '@/types/sales';

export const exportToExcel = (sales: SaleData[]) => {
    const wb = XLSX.utils.book_new();

    // Crear una hoja de cálculo para las ventas
    const wsData = sales.map(sale => ({
        'ID': sale.id,
        'Cliente': `${sale.customer.first_name} ${sale.customer.last_name}`,
        'Fecha': sale.sale_date,
        'Total': sale.total,
        'Estado': sale.status
    }));

    // Definir el tipo de detalle de venta
    interface DetailData {
        'Venta ID': number;
        'Producto': string;
        'Cantidad': number;
        'Precio': number;
        'Subtotal': number;
    }

    const detailData: DetailData[] = [];
    sales.forEach(sale => {
        sale.detail_sale.forEach(detail => {
            detailData.push({
                'Venta ID': sale.id,
                'Producto': detail.products.name,
                'Cantidad': detail.quantity,
                'Precio': detail.price,
                'Subtotal': detail.subtotal
            });
        });
    });

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wsDetail = XLSX.utils.json_to_sheet(detailData);

    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
    XLSX.utils.book_append_sheet(wb, wsDetail, 'Detalles de Ventas');
    const currentDate = new Date().toLocaleDateString('en-CA');
    const fileName = `reporte_ventas_EXCEL_${currentDate}.xlsx`;
    XLSX.writeFile(wb, fileName);
};
