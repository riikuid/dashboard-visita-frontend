import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'

export const Route = createFileRoute('/(auth)/exit')({
  beforeLoad: () => {
    console.log('test 1')
    // Reset auth state dan hapus token
    useAuthStore.getState().auth.reset()

    // Redirect ke halaman login
    throw redirect({ to: '/sign-in' })
  },
  // Optional component, won't be shown due to redirect
  component: () => null,
})
