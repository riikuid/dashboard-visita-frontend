'use client'

import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useRouter } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { API } from '@/lib/api'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

// sign in/component/user-auth-form.tsx

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  usernamePlaceholder?: string
  passwordPlaceholder?: string
  submitLabel?: string
}

const formSchema = z.object({
  username: z.string().min(1, { message: 'Please enter your username' }),
  password: z
    .string()
    .min(1, { message: 'Please enter your password' })
    .min(7, { message: 'Password must be at least 7 characters long' }),
})

export function UserAuthForm({
  className,
  usernamePlaceholder = 'username',
  passwordPlaceholder = '*******',
  submitLabel = 'Sign In',
  ...props
}: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const res = await fetch(API.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Login failed')
      }
      const result = await res.json()
      useAuthStore.getState().auth.setAccessToken(result.access_token)
      useAuthStore.getState().auth.setUser(result.user)
      await router.navigate({ to: '/dashboard' })
    } catch (e: any) {
      setErrorMessage(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            {/* Username */}
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder={usernamePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={passwordPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {errorMessage && (
              <p className='text-sm text-red-500'>{errorMessage}</p>
            )}

            {/* Submit Button */}
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Logging in...' : submitLabel}
            </Button>

            {/* Moved Forgot Password Link */}
            <div className='text-left'>
              <Link
                to='/forgot-password'
                className='text-xs text-gray-600 hover:underline'
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
