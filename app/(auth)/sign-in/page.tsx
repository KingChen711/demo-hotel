'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login } from '@/lib/actions/auth'
import { TLoginSchema, loginSchema } from '@/lib/schemas/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

function SignInPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: TLoginSchema) {
    setIsSubmitting(true)
    try {
      const token = await login(values)
      if (token) {
        localStorage.setItem('auth-token', token)
        router.push('/')
        return
      }

      throw new Error('Something went wrong!')
    } catch (error: any) {
      toast(error.message)
    }
    setIsSubmitting(false)
  }

  return (
    <div className='w-full lg:grid lg:grid-cols-2 min-h-screen'>
      <div className='hidden bg-muted lg:block'>
        <Image
          src='/assets/images/auth-banner.jpg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>

      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Sign in</h1>
            <p className='flex items-center text-muted-foreground justify-center'>
              Sign in to continue with
              <Image alt='logo' src='/assets/images/site-logo.svg' className='ml-1' width={16} height={16} />
              <span className='font-bold'>DemoHotel</span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='m@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center'>
                      <FormLabel>Password</FormLabel>
                      <Link href='#' className='ml-auto inline-block text-sm underline'>
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type='password' placeholder='Enter password...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isSubmitting} type='submit' className='w-full'>
                Login {isSubmitting && <Loader2 className='animate-spin ml-2' />}
              </Button>
              <div className={cn(buttonVariants({ variant: 'outline' }), 'w-full cursor-pointer')}>
                Login with Google
              </div>
            </form>
          </Form>

          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='#' className='underline'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
