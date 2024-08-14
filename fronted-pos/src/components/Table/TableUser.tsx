import { TableUserContent } from '../common/TableUserContent';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/_authenticated/users');
export const TableUser = () => {
	const { users } = routeApi.useLoaderData();
	return <TableUserContent members={users} />;
};
