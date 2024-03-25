'use client'

import { Button } from '@/components/ui/button'
import { login } from '@/lib/actions/auth'
import { useRouter } from 'next/navigation'
import React from 'react'

function SignInPage() {
  const router = useRouter()

  const handleClick = async () => {
    const token = await login()
    if (token) {
      localStorage.setItem('auth-token', token)
      router.push('/')
    }
  }

  return (
    <div>
      <Button onClick={handleClick}>Login</Button>
    </div>
  )
}

export default SignInPage
