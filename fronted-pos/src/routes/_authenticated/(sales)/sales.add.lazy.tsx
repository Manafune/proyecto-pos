import { SalesAdd } from '@/components/Sales/SalesAdd';
import { SalesStore } from '@/components/store/SalesStore';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/(sales)/sales/add')({
	component: () => (
		<SalesStore>
			<SalesAdd />
		</SalesStore>
	)
});
