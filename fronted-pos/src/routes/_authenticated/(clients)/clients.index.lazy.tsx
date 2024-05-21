import { createLazyFileRoute } from '@tanstack/react-router'
import { Clients } from '@/components/Clients/Clients';

export const Route = createLazyFileRoute('/_authenticated/(clients)/clients/')({
  component: () => <Clients></Clients>
})