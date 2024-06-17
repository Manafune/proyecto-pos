import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Label } from '@/components/ui/label';

const randomProducts = [
    { name: 'Producto 1', quantity: 1, price: 100, subtotal: 100 },
    { name: 'Producto 2', quantity: 2, price: 150, subtotal: 300 },
    { name: 'Producto 3', quantity: 3, price: 200, subtotal: 600 },
  ];

export const SalesAdd = () => {

    const total = randomProducts.reduce((sum, product) => sum + product.subtotal, 0);
    return (
        <div className="p-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Ventas</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <Label htmlFor="dni" className="block text-sm font-medium text-gray-700">Buscar Cliente por DNI</Label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <Input
                  type="text"
                  name="dni"
                  id="dni"
                  className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  placeholder="Ingrese DNI del cliente"
                />
                <Button type="button" className="rounded-r-md">
                  Buscar
                </Button>
              </div>
            </div>
  
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Nombres</Label>
                <Input type="text" name="first-name" id="first-name" className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md" readOnly />
              </div>
              <div>
                <Label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Apellidos</Label>
                <Input type="text" name="last-name" id="last-name" className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md" readOnly />
              </div>
              <div>
                <Label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</Label>
                <Input type="text" name="dni" id="dni" className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md" readOnly />
              </div>
            </div>
  
            <div className="mb-6">
              <Label htmlFor="product" className="block text-sm font-medium text-gray-700">Buscar Producto</Label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <Input
                  type="text"
                  name="product"
                  id="product"
                  className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  placeholder="Ingrese nombre del producto"
                />
                <Button type="button" className="rounded-r-md">
                  Buscar
                </Button>
              </div>
            </div>
  
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Producto</Label>
                <Input type="text" name="product-name" id="product-name" className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md" readOnly />
              </div>
              <div>
                <Label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad</Label>
                <Input type="number" name="quantity" id="quantity" className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div>
                <Label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</Label>
                <Input type="text" name="price" id="price" className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
  
            <Button type="button" className="w-full">
              Añadir
            </Button>
          </div>
  
          <div>
            <div className="overflow-x-auto mb-6">
              <Table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {randomProducts.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Input type="number" value={product.quantity} className="w-16" readOnly />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${product.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
  
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-medium text-gray-700">Total: ${total}</div>
              <div>
                <Button type="button" className="bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Generar Venta
                </Button>
                <Button type="button" className="ml-2 bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

