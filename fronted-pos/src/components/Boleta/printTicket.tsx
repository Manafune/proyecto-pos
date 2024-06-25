import React from 'react';
import jsPDF from 'jspdf';
import boletaImg from '@/utils/Logo.jpeg';

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
      format: [docWidth, docHeight]  // Tamaño personalizado para boleta de venta
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
    doc.setFontSize(10);
    doc.text('Minimarket POS', textX, 50, { align: 'center' });
    doc.text('Boleta de Venta', textX, 55, { align: 'center' });

    doc.setFontSize(8);
    doc.text(`Fecha: ${invoice.date}`, textX, 60, { align: 'center' });
    doc.text(`Cliente: ${invoice.customer}`, textX, 65, { align: 'center' });

    // Detalle de productos con subtotales
    let y = 70;
    invoice.products.forEach((product, index) => {
      const subtotal = product.quantity * product.price;
      doc.text(`${index + 1}. ${product.name} - ${product.quantity} x ${product.price} = $${subtotal}`, 10, y);
      y += 5;
    });

    // Total
    y += 10; // Espacio adicional antes de mostrar el total
    doc.setFontSize(10);
    doc.text(`Total: $${invoice.total}`, textX, y, { align: 'center' });

    // Guardar PDF con nombre específico
    const pdfUrl = doc.output('bloburl');
    const win = window.open(pdfUrl.toString(), '_blank');
    if (!win) {
      alert('No se pudo abrir la vista previa del PDF. Por favor, habilite las ventanas emergentes para este sitio.');
    }
  };

  return (
    <div>
      <button onClick={generatePDF}>Generar Boleta de Venta</button>
    </div>
  );
};

export default InvoicePdf;
