import React from 'react';
import { TableUserContent } from '../common/TableUserContent';
import { getRouteApi } from '@tanstack/react-router';
import { BasePagination } from '../common/BasePagination';
import { type UsersPagination as UserPaginationType } from '@/routes/_authenticated/(users)/users';
const routeApi = getRouteApi('/_authenticated/users');
export const TableUser = () => {
	const { users, totalUsers } = routeApi.useLoaderData();
	const { pageSize, current } = routeApi.useSearch();
	return (
		<React.Fragment>
			<TableUserContent members={users} />
			<BasePagination<UserPaginationType>
				total={totalUsers}
				currentPage={current}
				pageSize={pageSize}
				routePath='/users'
				toSearchParams={(prev, newPage) => ({ ...prev, current: newPage })}
			/>
		</React.Fragment>
	);
};
