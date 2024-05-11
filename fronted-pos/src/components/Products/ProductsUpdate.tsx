export const ProductsUpdate = ({ productId }) => {
    const [product, setProduct] = useState({
      name: '',
      container: '',
      price: '',
      stock: '',
    });
  
    useEffect(() => {
      fetchProduct();
    }, []);
  
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();
  
        if (error) {
          throw error;
        }
  
        setProduct(data);
      } catch (error) {
        console.error('Error al cargar el producto:', error.message);
      }
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setProduct({ ...product, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const { error } = await supabase.from('products').update(product).eq('id', productId);
  
        if (error) {
          throw error;
        }
  
        alert('Producto actualizado exitosamente');
      } catch (error) {
        console.error('Error al actualizar el producto:', error.message);
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="container" className="block mb-1">Envase:</label>
            <input
              type="text"
              id="container"
              name="container"
              value={product.container}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block mb-1">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Actualizar Producto</button>
        </form>
      </div>
    );
  };
  