import { createFileRoute } from '@tanstack/react-router'

export interface SalesPagination {
	pageSize: number;
	current: number;
}

export const Route = createFileRoute('/_authenticated/(sales)/sales')({
  component: () => <div>Hello /_authenticated/(sales)/sales!</div>
})