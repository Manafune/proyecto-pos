import { TableSaleContent } from '@/components/common/TableSaleContent';
import { getRouteApi } from '@tanstack/react-router';
const routeApi = getRouteApi('/_authenticated/sales');
export const TableSale = () => {

  const {sales} = routeApi.useLoaderData();

  return (
    <>
    <TableSaleContent sales={sales}/>
    </>

  )
}
