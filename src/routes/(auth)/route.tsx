import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: () => {
    const token = useAuthStore.getState().auth.accessToken
    if (token) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: () => (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <Outlet /> {/* Renders sign-in, sign-up, etc. */}
    </div>
  ),
})
