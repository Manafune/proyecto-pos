import { TableContent } from '@/components/common/TableContent';
import { getRouteApi } from '@tanstack/react-router';
const routeApi = getRouteApi('/_authenticated/products');
export const TableProduct = () => {
	const products = routeApi.useLoaderData();
  console.log(products)
	return <TableContent products={products} />;
};
