'use client'

import { logout } from '@/lib/actions/auth'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function LogOutButton({ children }: Props) {
  const router = useRouter()

  const handleLogOut = async () => {
    await logout()
    localStorage.removeItem('auth-token')

    router.push('/sign-in')
  }

  return <div onClick={handleLogOut}>{children}</div>
}

export default LogOutButton
