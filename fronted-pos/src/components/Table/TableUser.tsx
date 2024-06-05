import { TableUserContent } from '@/components/common/TableUserContent';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/_authenticated/users');
export const TableUser = () => {
	const { users } = routeApi.useLoaderData();
	return <TableUserContent users={users} />;
};
