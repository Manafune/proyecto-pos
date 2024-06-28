import React, { useState } from 'react';
import InvoicePdf from '@/components/Boleta/printTicket'

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
}

const Boleta: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    date: '2024-06-25',
    customer: 'Cliente Ejemplo',
    products: [
      { name: 'Producto 1', quantity: 2, price: 10 },
      { name: 'Producto 2', quantity: 1, price: 20 },
      { name: 'Producto 3', quantity: 1, price: 20 },
      { name: 'Producto 2', quantity: 1, price: 20 },
      { name: 'Producto 2', quantity: 1, price: 20 },
      { name: 'Producto 2', quantity: 1, price: 20 }
    ],
    total: 50
  });

  return (
    <div>
      <h1>Generador de Boletas de Venta</h1>
      <InvoicePdf invoice={invoice} />
    </div>
  );
};

export default Boleta;