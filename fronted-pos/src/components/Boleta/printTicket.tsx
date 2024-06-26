import React from 'react';
import jsPDF from 'jspdf';
import boletaImg from '@/utils/Logo.jpeg';
import { Button } from '@/components/ui/button';

interface Product {
	name: string;
	quantity: number;
	price: number;
}

interface Invoice {
	date: string;
	customer: string;
	products: Product[];
	total: number;
	serial: number;
}

const InvoicePdf: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
	const generatePDF = () => {
		const docWidth = 80;
		const docHeight = 150;

		// Crear documento PDF con tamaño y orientación personalizados
		const doc = new jsPDF({
			orientation: 'portrait',
			unit: 'mm',
			format: [docWidth, docHeight] // Tamaño personalizado para boleta de venta
		});

		// Calcular posiciones centradas
		const imgWidth = 70;
		const imgHeight = 40;
		const centerX = docWidth / 2;
		const imgX = (docWidth - imgWidth) / 2;
		const textX = centerX;

		// Agregar imagen al documento PDF
		doc.addImage(boletaImg, 'JPEG', imgX, 5, imgWidth, imgHeight);

		// Establecer estilos y contenido
		doc.setFontSize(13);
		doc.text('Minimarket POS', textX, 50, { align: 'center' });
		doc.text('Boleta de Venta', textX, 55, { align: 'center' });

		doc.setFontSize(11);
		doc.text(`-Fecha: ${invoice.date}-`, textX, 60, { align: 'center' });
		doc.text(`Cliente: ${invoice.customer}`, textX, 65, { align: 'center' });

		// Detalle de productos con subtotales en formato de tabla
		let y = 70;

		doc.setFontSize(7);
		doc.text('Producto', 6, y);
		doc.text('Cant.', 40, y); // Mover más a la izquierda
		doc.text('Precio', 49, y); // Mover más a la izquierda
		doc.text('Subtotal', 64, y); // Mover más a la izquierda

		y += 2; // Ajustar para que la línea esté más cerca de los encabezados
		doc.setLineWidth(0.1);
		doc.line(6, y, 75, y); // Extender la línea un poco más hacia la derecha

		y += 5; // Ajustar el espacio después de la línea
		invoice.products.forEach((product) => {
			const subtotal = product.quantity * product.price;
			doc.text(product.name, 6, y);
			doc.text(product.quantity.toString(), 43, y, { align: 'right' });
			doc.text(`S/.${product.price.toFixed(2)}`, 58, y, { align: 'right' });
			doc.text(`S/.${subtotal.toFixed(2)}`, 73, y, { align: 'right' });
			y += 6; // Aumentar el espacio entre las líneas de productos
		});

		// Total
		y += 8; // Espacio adicional antes de mostrar el total
		doc.setFontSize(10);
		doc.text(`Total: S/.${invoice.total.toFixed(2)}`, textX, y, { align: 'center' });

		// Guardar PDF con nombre específico
		const pdfUrl = doc.output('bloburl');
		const win = window.open(pdfUrl.toString(), '_blank');
		if (!win) {
			alert('No se pudo abrir la vista previa del PDF. Por favor, habilite las ventanas emergentes para este sitio.');
		}
	};

	return (
		<div>
			<Button variant='outline' size='icon' className='overflow-hidden rounded-full' onClick={generatePDF}>
				<img src='https://imgur.com/3VTic93.jpeg' width={36} height={36} alt='Avatar' className='overflow-hidden rounded-full' />
			</Button>
		</div>
	);
};

export default InvoicePdf;
