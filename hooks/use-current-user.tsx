'use client'

import { whoAmI } from '@/lib/actions/auth'
import { User } from '@/types'
import { useEffect, useState } from 'react'

function useCurrentUser(): User | null {
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    setAuthToken(localStorage.getItem('auth-token')) //for sure that this code running at client
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      if (authToken) {
        const currentUser = await whoAmI(authToken)
        setCurrentUser(currentUser)
      }
    }

    fetchUser()
  }, [authToken])

  return currentUser
}

export default useCurrentUser
