import { Settings } from '@/components/Settings/Settings';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/settings')({
	component: () => <Settings />,
});
