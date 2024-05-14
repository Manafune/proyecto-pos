
import { createLazyFileRoute } from '@tanstack/react-router';
// import { TableContent } from '@/components/Table/TableContent';

const HomeComponent = () => {
	return (
		<>
			<div>Bienvenido al sistema</div>
		</>
	)
};

export const Route = createLazyFileRoute('/_authenticated/')({
	component: HomeComponent,
});
