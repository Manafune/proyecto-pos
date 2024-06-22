import UserAdd from '@/components/Users/UserAdd'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/(users)/users/add')({
  component: () => <UserAdd/>
})