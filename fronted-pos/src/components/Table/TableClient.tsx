import { TableClientContent } from '@/components/common/TableClientContent';
import { getRouteApi } from '@tanstack/react-router';
import React from 'react';
import { BasePagination } from '../common/BasePagination';
import { ClientsPagination } from '@/routes/_authenticated/(clients)/clients';

const routeApi = getRouteApi('/_authenticated/clients');
export const TableClient = () => {
	const { clients, totalClients } = routeApi.useLoaderData();
	const { pageSize, current } = routeApi.useSearch();

	return (
		<React.Fragment>
			<TableClientContent addressClients={clients} />
			<BasePagination<ClientsPagination>
				total={totalClients}
				currentPage={current}
				pageSize={pageSize}
				routePath='/clients'
				toSearchParams={(prev, newPage) => ({ ...prev, current: newPage })}
			/>
		</React.Fragment>
	);
};
