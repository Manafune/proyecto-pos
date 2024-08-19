import { TableContent } from '@/components/common/TableContent';
import { getRouteApi } from '@tanstack/react-router';
import React from 'react';
import { BasePagination } from '../common/BasePagination';
import { type ProductsPagination } from '@/routes/_authenticated/(products)/products';
const routeApi = getRouteApi('/_authenticated/products');
export const TableProduct = () => {
	const { products, totalProducts } = routeApi.useLoaderData();
	const { current, pageSize } = routeApi.useSearch();
	return (
		<React.Fragment>
			<TableContent products={products} totalProducts={totalProducts} />
			<BasePagination<ProductsPagination>
				total={totalProducts}
				currentPage={current}
				pageSize={pageSize}
				routePath='/clients'
				toSearchParams={(prev, newPage) => ({ ...prev, current: newPage })}
			/>
		</React.Fragment>
	);
};
