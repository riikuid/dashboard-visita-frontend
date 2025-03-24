import { createLazyFileRoute } from '@tanstack/react-router'
import VisitorManagement from '@/features/visitor-management/visitors'

export const Route = createLazyFileRoute('/_authenticated/visitor-management/visitors copy/')(
  {
    component: VisitorManagement,
  }
)
