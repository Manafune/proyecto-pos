import { TableUserContent } from '@/components/common/TableUserContent';
import { getRouteApi } from '@tanstack/react-router';

// Define the route API for fetching users data
const routeApi = getRouteApi('/_authenticated/users');

export const TableUser = () => {
	// Use the loader data hook to fetch users data
	const { users } = routeApi.useLoaderData();

	// Check if users data exists and is an array
	if (!users || !Array.isArray(users)) {
		return <div>No users data available</div>;
	}

	// Render the TableUserContent component with users data
	return <TableUserContent user={users} />;
};
