import { createLazyFileRoute } from '@tanstack/react-router'
import AccessControls from '@/features/card-rfid'

export const Route = createLazyFileRoute('/_authenticated/card-rfid/')({
  component: AccessControls,
})
