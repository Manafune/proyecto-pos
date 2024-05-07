import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/products')({
	component: () => <div>Hello /products!</div>,
});
