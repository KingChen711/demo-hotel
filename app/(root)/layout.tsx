import LeftSideBar from '@/components/shared/left-side-bar'
import NavBar from '@/components/shared/nav-bar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className='relative bg-muted'>
      <NavBar />
      <div className='flex'>
        <LeftSideBar />
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
          <div className='mx-auto w-full'>{children}</div>
        </section>
      </div>
    </main>
  )
}

export default Layout
