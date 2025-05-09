import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: ({ location }) => {
    const token = useAuthStore.getState().auth.accessToken

    // ⛔ Jangan redirect kalau sedang akses /exit
    if (token && location.pathname !== '/exit') {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: () => (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <Outlet />
    </div>
  ),
})
