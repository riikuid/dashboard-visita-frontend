// src/routes/_authenticated/visitor-management/visitors/$visitorId.lazy.tsx
import { createLazyFileRoute } from '@tanstack/react-router'
import CompanyDetail from '@/features/visitor-management/companies/detail-company'

export const Route = createLazyFileRoute(
  '/_authenticated/visitor-management/companies/$companyId'
)({
  component: CompanyDetail,
})
