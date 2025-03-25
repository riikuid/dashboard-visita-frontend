import { createLazyFileRoute } from '@tanstack/react-router'
import AccessControls from '@/features/access-controls'

export const Route = createLazyFileRoute('/_authenticated/access-controls/')({
  component: AccessControls,
})
