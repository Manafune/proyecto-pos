import { ClientsUpdate } from '@/components/Clients/ClientsUpdate';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/(clients)/clients/$id')({
	component: () => <ClientsUpdate></ClientsUpdate>
});
