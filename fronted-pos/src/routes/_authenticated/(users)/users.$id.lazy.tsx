import { createLazyFileRoute } from '@tanstack/react-router'
import { UserEdit } from '@/components/Users/UserEdit'

export const Route = createLazyFileRoute('/_authenticated/(users)/users/$id')({
  component: () => <UserEdit/>
})