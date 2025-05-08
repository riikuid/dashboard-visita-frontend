import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AxiosError } from 'axios'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { handleServerError } from '@/utils/handle-server-error'
import { toast } from '@/hooks/use-toast'
import { ThemeProvider } from './context/theme-context'
import './index.css'
import { routeTree } from './routeTree.gen'

// Step 1: Create a router instance FIRST (so we can access it later)
const router = createRouter({
  routeTree,
  context: undefined!, // will be injected later
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

// Step 2: Create QueryClient AFTER router is available
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (import.meta.env.DEV) console.log({ failureCount, error })
        if (failureCount >= 0 && import.meta.env.DEV) return false
        if (failureCount > 3 && import.meta.env.PROD) return false
        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        )
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000,
    },
    mutations: {
      onError: (error) => {
        handleServerError(error)
        if (error instanceof AxiosError && error.response?.status === 304) {
          toast({
            variant: 'destructive',
            title: 'Content not modified!',
          })
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status
        if (status === 401) {
          toast({ variant: 'destructive', title: 'Session expired!' })
          useAuthStore.getState().auth.reset()
          const redirect = router?.state.location.href || '/'
          router.navigate({ to: '/sign-in', search: { redirect } })
        } else if (status === 500) {
          toast({ variant: 'destructive', title: 'Internal Server Error!' })
          router.navigate({ to: '/500' as any })
        } else if (status === 403) {
          // router.navigate({ to: '/forbidden', replace: true })
        }
      }
    },
  }),
})

// Step 3: Inject context to router
router.update({
  context: {
    queryClient,
  },
})

// Step 4: Type-safe declaration
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Step 5: Mount the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
