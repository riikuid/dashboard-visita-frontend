import { createLazyFileRoute } from '@tanstack/react-router'
import Companies from '@/features/visitor-management/companies'

export const Route = createLazyFileRoute(
  '/_authenticated/visitor-management/companies/'
)({
  component: Companies,
})
