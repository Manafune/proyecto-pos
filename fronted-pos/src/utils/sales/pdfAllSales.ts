import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { type SaleData } from '@/types/sales';

// Función para formatear la fecha y eliminar la hora
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Obtener solo la parte de la fecha
};

export const generatePDF = (sales: SaleData[]) => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Reporte de Ventas', 14, 22);

    // Configurar la tabla
    const tableColumn = ["ID", "Cliente", "Fecha", "Total", "Estado", "Producto", "Cantidad", "Precio", "Subtotal"];
    const tableRows: any[] = [];

    sales.forEach(sale => {
        const saleRow = [
            sale.id,
            `${sale.customer.first_name} ${sale.customer.last_name}`,
            formatDate(sale.sale_date),
            sale.total.toFixed(2),
            sale.status
        ];

        // Agregar detalles de la venta
        sale.detail_sale.forEach((detail, index) => {
            const detailRow = [
                index === 0 ? sale.id : '',
                index === 0 ? `${sale.customer.first_name} ${sale.customer.last_name}` : '',
                index === 0 ? formatDate(sale.sale_date) : '',
                index === 0 ? sale.total.toFixed(2) : '',
                index === 0 ? sale.status : '',
                detail.products.name,
                detail.quantity,
                detail.price.toFixed(2),
                detail.subtotal.toFixed(2)
            ];
            tableRows.push(detailRow);
        });
    });

    // Agregar la tabla al PDF
    (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'striped',
        headStyles: { fillColor: [0, 112, 192], textColor: [255, 255, 255] },
        bodyStyles: { textColor: [50, 50, 50] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        styles: { cellPadding: 3, fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 10 },  // ID
            1: { cellWidth: 30 },  // Cliente
            2: { cellWidth: 20 },  // Fecha
            3: { cellWidth: 15 },  // Total
            4: { cellWidth: 15 },  // Estado
            5: { cellWidth: 30 },  // Producto
            6: { cellWidth: 15 },  // Cantidad
            7: { cellWidth: 15 },  // Precio
            8: { cellWidth: 20 }   // Subtotal
        }
    });

    // Descargar el PDF
    doc.save('reporte_ventas.pdf');
};
