import { TableSaleContent } from '@/components/common/TableSaleContent';
import { getRouteApi } from '@tanstack/react-router';
import React from 'react';
import { SalesPagination } from '../common/Pagination/SalesPagination';
const routeApi = getRouteApi('/_authenticated/sales');
export const TableSale = () => {
	const { sales, totalSales } = routeApi.useLoaderData();

	return (
		<React.Fragment>
			<TableSaleContent sales={sales} />
			<SalesPagination total={totalSales as number} />
		</React.Fragment>
	);
};
