import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      {/* Left Section */}
      <section
        className='w-[75%] bg-gradient-to-br from-indigo-700 via-purple-800 to-fuchsia-900
 p-8 relative flex flex-col justify-start items-start overflow-hidden'
      >
        <div className='relative z-10'>
          <div className='flex items-center gap-4 mb-4'>
            <img
              src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pjb-removebg-preview-dAnUllFGg0IhYh3jNPZ5WHRIjGg5wl.png'
              alt='PJB Logo'
              className='h-16 w-auto'
            />
          </div>
          <h2 className='text-white text-2xl font-semibold'>
            Office Command Center
          </h2>
        </div>
        <div className='absolute top-1/3 right-[-10%] w-[120%] h-[120%] bg-white/10 rounded-full rotate-[-10deg]' />
      </section>

      {/* Right Section */}
      <section className='w-[25%] bg-white px-8 flex flex-col justify-center'>
        <div className='w-full'>
          <div className='mb-6 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email and password below <br />
              to log into your account
            </p>
          </div>

          <UserAuthForm />

          <p className='mt-4 text-center text-sm text-muted-foreground'>
            By clicking login, you agree to our{' '}
            <a
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </a>
            .
          </p>

          <p className='mt-6 text-center text-sm text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <a
              href='/signup'
              className='underline underline-offset-4 hover:text-primary'
            >
              Sign Up
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
