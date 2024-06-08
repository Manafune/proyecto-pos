import { ClientsAdd } from '@/components/Clients/ClientsAdd';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/(clients)/clients/add')({
	component: () => <ClientsAdd />
});
