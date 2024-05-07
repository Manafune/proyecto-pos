import SignIn from '@/components/Auth/SignIn';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/sign-in')({
	component: () => <SignIn></SignIn>,
});
