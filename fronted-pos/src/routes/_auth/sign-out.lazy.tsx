import SignOut from '@/components/Auth/SignOut';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/sign-out')({
	component: () => <SignOut />,
});
