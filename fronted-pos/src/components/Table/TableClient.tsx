import { TableClientContent } from '@/components/common/TableClientContent';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/_authenticated/clients');
export const TableClient = () => {
	const { clients } = routeApi.useLoaderData();

	return <TableClientContent addressClients={clients} />;
};
