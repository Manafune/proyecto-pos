import { TableClientContent } from '@/components/common/TableClientContent';
import { getRouteApi } from '@tanstack/react-router';
import React from 'react';
import { ClientPagination } from '../common/Pagination/ClientsPagination';

const routeApi = getRouteApi('/_authenticated/clients');
export const TableClient = () => {
	const { clients, totalClients } = routeApi.useLoaderData();
	return (
		<React.Fragment>
			<TableClientContent addressClients={clients} />
			<ClientPagination total={totalClients as number} />
		</React.Fragment>
	);
};
