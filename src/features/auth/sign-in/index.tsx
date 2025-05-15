'use client'

import { Card, CardContent } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'

// sign in/index.tsx

export default function SignIn() {
  return (
    <div className='flex h-screen w-screen overflow-hidden font-sans'>
      {/* LEFT 65% */}
      <section className='w-[65%] relative flex flex-col p-8 bg-gradient-to-br from-[#40C9FF] via-[#22A6B3] to-[#341F97] overflow-hidden'>
        {/* Logo & Title */}
        <div className='relative z-10'>
          <img
            src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pjb-removebg-preview-dAnUllFGg0IhYh3jNPZ5WHRIjGg5wl.png'
            alt='PJB Logo'
            className='h-16 mb-4 w-auto'
          />
          <h2 className='text-white text-3xl font-semibold'>
            Office Command Center
          </h2>
        </div>
        {/* Top‐right blob */}
        <div className='absolute top-1/3 right-[-10%] w-[120%] h-[120%] bg-white/10 rounded-full -rotate-10' />
        {/* Bottom‐left blob */}
        <div className='absolute bottom-[-10%] left-[-20%] w-[150%] h-[150%] bg-white/20 rounded-full rotate-15' />
      </section>

      {/* RIGHT 35% */}
      <section className='w-[35%] bg-white flex items-center justify-center p-8'>
        <div className='w-full max-w-xs'>
          {/* Heading */}
          <h1 className='text-2xl font-semibold text-center mb-6'>Sign In</h1>

          {/* Card with form */}
          <Card className='border border-gray-200 rounded-lg'>
            <CardContent className='p-6'>
              <UserAuthForm submitLabel='Sign In' />
            </CardContent>
          </Card>

          {/* Sign up link */}
          <p className='mt-6 text-center text-sm text-gray-700'>
            Don&apos;t have an account?{' '}
            <a
              href='/sign-up'
              className='text-green-600 font-medium hover:underline'
            >
              Sign Up
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
