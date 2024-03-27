import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MobileNavBar from './mobile-nav-bar'
import { whoAmI } from '@/lib/actions/auth'
import { cookies } from 'next/headers'
import LogOutButton from './log-out-button'

async function NavBar() {
  const cookieStore = cookies()
  const authToken = cookieStore.get('auth-token')!.value
  const currentUser = (await whoAmI(authToken))!

  return (
    <nav className='bg-card flex justify-between items-center fixed z-50 w-full gap-5 p-6 sm:px-12'>
      <Link href='/' className='flex items-center gap-1'>
        <Image src='/assets/images/site-logo.svg' width={28} height={28} alt='logo' />

        <p className='text-2xl font-bold leading-[31.2px] font-spaceGrotesk max-sm:hidden'>
          Demo<span className='text-primary'>Hotel</span>
        </p>
      </Link>
      <div className='flex justify-between items-center gap-5'>
        <div className='flex items-center gap-2 max-sm:hidden'>
          <Avatar>
            <AvatarImage alt='user' src={currentUser.avatarUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <div className='font-bold text-sm'>{currentUser.name}</div>
            <LogOutButton>
              <div className='text-sm cursor-pointer hover:underline hover:text-primary'>Log out</div>
            </LogOutButton>
          </div>
        </div>

        <MobileNavBar currentUser={currentUser} />
      </div>
    </nav>
  )
}

export default NavBar
