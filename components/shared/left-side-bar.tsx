'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function LeftSideBar() {
  return (
    <section className='bg-card custom-scrollbar sticky left-0 top-0 flex h-screen w-fit shrink-0 flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-[266px]'>
      <NavContent />

      {/* <SignedOut>
      <div className='flex flex-col gap-3'>
        <Link href='/sign-in'>
          <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3'>
            <span className='primary-text-gradient max-lg:hidden'>Log In</span>
            <Image src='/assets/icons/account.svg' alt='login' width={20} height={20} className='lg:hidden' />
          </Button>
        </Link>

        <Link href='/sign-up'>
          <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3'>
            <span className='max-lg:hidden'>Sign Up</span>
            <Image src='/assets/icons/sign-up.svg' alt='sign-up' width={20} height={20} className='lg:hidden' />
          </Button>
        </Link>
      </div>
    </SignedOut> */}
    </section>
  )
}

export default LeftSideBar

const NavContent = () => {
  const pathname = usePathname()

  console.log({ pathname })

  return (
    <div className='flex flex-col gap-6'>
      {sidebarLinks.map((item) => {
        console.log({ itemRoute: item.route })

        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

        return (
          <Link
            key={item.route}
            href={item.route}
            className={cn(
              isActive && 'bg-primary text-primary-foreground rounded-lg',
              'flex items-center justify-start gap-4 p-4'
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn(isActive && 'invert-colors')}
            />
            <p
              className={cn(
                'max-lg:hidden',
                isActive ? 'text-[18px] font-bold leading-[140%]' : 'font-medium leading-[18.2px]'
              )}
            >
              {item.label}
            </p>
          </Link>
        )
      })}
    </div>
  )
}
