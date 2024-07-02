import { Sales } from '@/components/Sales/Sales';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/(sales)/sales/')({
	component: () => <Sales />
});
