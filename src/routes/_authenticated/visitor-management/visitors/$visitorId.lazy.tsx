// src/routes/_authenticated/visitor-management/visitors/$visitorId.lazy.tsx
import { createLazyFileRoute } from '@tanstack/react-router'
import VisitorDetail from '@/features/visitor-management/visitors/detail-visitor'

export const Route = createLazyFileRoute('/_authenticated/visitor-management/visitors/$visitorId')({
  component: VisitorDetail,
})