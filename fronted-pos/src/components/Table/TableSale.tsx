import { TableSaleContent } from '@/components/common/TableSaleContent';
import { getRouteApi } from '@tanstack/react-router';
import React from 'react';
import { BasePagination } from '../common/BasePagination';
import { SalesPagination } from '@/routes/_authenticated/(sales)/sales';
const routeApi = getRouteApi('/_authenticated/sales');
export const TableSale = () => {
	const { sales, totalSales } = routeApi.useLoaderData();
	const { current, pageSize } = routeApi.useSearch();

	return (
		<React.Fragment>
			<TableSaleContent sales={sales} />
			<BasePagination<SalesPagination>
				total={totalSales as number}
				currentPage={current}
				pageSize={pageSize}
				routePath='/sales'
				toSearchParams={(prev, newPage) => ({ ...prev, current: newPage })}
			/>
		</React.Fragment>
	);
};
