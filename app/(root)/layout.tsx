import LeftSideBar from '@/components/shared/left-side-bar'
import NavBar from '@/components/shared/nav-bar'
import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { whoAmI } from '@/lib/actions/auth'

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const cookieStore = cookies()
  const authToken = cookieStore.get('auth-token')?.value

  if (!authToken) {
    redirect('/sign-in')
  }

  const currentUser = await whoAmI(authToken)

  if (!currentUser) {
    redirect('/sign-in')
  }

  return (
    <main className='relative bg-muted'>
      <NavBar />
      <div className='flex'>
        <LeftSideBar />
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-32 max-md:pb-14 sm:px-14'>
          <div className='mx-auto w-full'>{children}</div>
        </section>
      </div>
    </main>
  )
}

export default Layout
