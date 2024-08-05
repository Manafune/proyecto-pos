import { MainPage } from '@/components/Main/Main';
import { createLazyFileRoute } from '@tanstack/react-router';
const HomeComponent = () => {
	return (
		<>
			<MainPage />
		</>
	);
};

export const Route = createLazyFileRoute('/_authenticated/(main)/')({
	component: HomeComponent
});
