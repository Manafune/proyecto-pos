import { createLazyFileRoute } from '@tanstack/react-router'
import { Clients } from '@/components/Clients/Clients';

export const Route = createLazyFileRoute('/_authenticated/clients/')({
  component: () => <Clients></Clients>
})