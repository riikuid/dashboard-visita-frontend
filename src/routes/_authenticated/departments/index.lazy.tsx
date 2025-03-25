import { createLazyFileRoute } from '@tanstack/react-router'
import Departments from '@/features/departments'

export const Route = createLazyFileRoute('/_authenticated/departments/')({
  component: Departments,
})
