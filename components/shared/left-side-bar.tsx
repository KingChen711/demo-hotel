'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function LeftSideBar() {
  const pathname = usePathname()
  return (
    <section className='bg-card custom-scrollbar sticky left-0 top-0 flex h-screen w-fit shrink-0 flex-col justify-between overflow-y-auto border-r p-6 pt-32 max-sm:hidden lg:w-[266px]'>
      <div className='flex flex-col gap-6'>
        {sidebarLinks.map((item) => {
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
                alt={item.label.toLocaleLowerCase()}
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
    </section>
  )
}

export default LeftSideBar
