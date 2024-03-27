'use client'

import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from '@/types'
import LogOutButton from './log-out-button'

type Props = {
  currentUser: User
}

function MobileNavBar({ currentUser }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src='/assets/icons/hamburger.svg' alt='menu' width={36} height={36} className='sm:hidden' />
      </SheetTrigger>

      <SheetContent side='left' className='border-none'>
        <Link href='/' className='flex items-center gap-1'>
          <Image src='/assets/images/site-logo.svg' width={28} height={28} alt='logo' />

          <p className='text-2xl font-bold leading-[31.2px] font-spaceGrotesk'>
            Demo<span className='text-primary'>Hotel</span>
          </p>
        </Link>
        <div className=''>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <div className='flex flex-col items-center gap-3 mt-8'>
            <Avatar>
              <AvatarImage alt='user' src={currentUser.avatarUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className='font-bold text-lg'>{currentUser.name}</div>

            <SheetClose asChild>
              <Link className='w-full' href='/sign-in'>
                <LogOutButton>
                  <Button variant='secondary' className='small-medium min-h-[41px] rounded-lg px-4 py-3 w-full'>
                    Log Out
                  </Button>
                </LogOutButton>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavBar

const NavContent = () => {
  const pathname = usePathname()
  return (
    <section className='flex flex-col gap-6 pt-16 flex-1'>
      {sidebarLinks.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={cn(
                isActive && 'bg-primary rounded-lg text-primary-foreground',
                'flex items-center justify-start gap-4 p-4'
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label.toLocaleLowerCase()}
                width={20}
                height={20}
                className={cn(isActive && 'invert-colors')}
              />
              <p className={cn(isActive ? 'text-[18px] font-bold leading-[140%]' : 'font-medium leading-[18.2px]')}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}
