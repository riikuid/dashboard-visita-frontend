// import { createLazyFileRoute } from '@tanstack/react-router'
// import Dashboard from '@/features/dashboard'
// export const Route = createLazyFileRoute('/_authenticated/dashboard/')({
//   component: Dashboard,
// })
// src/routes/_authenticated/dashboard.tsx
import { createLazyFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/dashboard/')({
  component: () => <Navigate to='/visitor-management/visitors' />,
})
