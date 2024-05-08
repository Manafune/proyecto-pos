import SignUp from '@/components/Auth/SignUp';
import { createLazyFileRoute } from '@tanstack/react-router';


export const Route = createLazyFileRoute('/_auth/sign-up')({
	component: () => <SignUp />,
});
