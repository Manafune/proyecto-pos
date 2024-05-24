import { TableContent } from '@/components/common/TableContent';
import { getRouteApi } from '@tanstack/react-router';
import React from 'react';
import { BasePagination } from '../common/Pagination/Pagination';
const routeApi = getRouteApi('/_authenticated/products');
export const TableProduct = () => {
	const { products, totalProducts } = routeApi.useLoaderData();
	return (
		<React.Fragment>
			<TableContent products={products} totalProducts={totalProducts} />;
			<BasePagination total={totalProducts} />
		</React.Fragment>
	);
};
