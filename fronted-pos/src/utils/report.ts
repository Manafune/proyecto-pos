import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Product } from '@/types/products';

const printTicket = (products: Product[]) => {
  const doc = new jsPDF();

  // Título centrado
  const title = 'Lista de Productos';
  doc.setFontSize(18);
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(title);
  const x = (pageWidth - textWidth) / 2;
  doc.text(title, x, 20);

  // Datos para la tabla
  const head = [['ID', 'Nombre', 'Precio', 'Stock', 'Estado', 'Contenedor']];
  const body = products.map(product => [
    product.id,
    product.name,
    product.price.toFixed(2),
    product.stock,
    product.status,
    product.container
  ]);

  // Crear la tabla
  autoTable(doc, {
    startY: 30,
    head: head,
    body: body,
  });

  // Guardar el PDF
  doc.save('Lista_Productos.pdf');
  console.log('./Lista_Productos.pdf generado');
};

export default printTicket;
