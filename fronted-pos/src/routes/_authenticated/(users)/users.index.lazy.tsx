import { Users } from '@/components/Users/Users'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/(users)/users/')({
  component: () => <Users></Users>
})