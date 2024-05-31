import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(clients)/clients')({
  component: () => <div>Hello /_authenticated/(clients)/clients!</div>
})