import { SalesAdd } from '@/components/Sales/SalesAdd'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/(sales)/sales/add')({
  component: () => <SalesAdd/>
})