import { createLazyFileRoute } from '@tanstack/react-router'
import CCTV from '@/features/cctv'

export const Route = createLazyFileRoute('/_authenticated/cctv/')({
  component: CCTV,
})
