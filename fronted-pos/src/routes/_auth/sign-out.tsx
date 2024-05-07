import { SignOut } from '@/components/Auth/SignOut';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/sign-out')({
	component: () => <SignOut />,
});
