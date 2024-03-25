import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <nav className='bg-card flex justify-between items-center fixed z-50 w-full gap-5 p-6 sm:px-12'>
      <Link href='/' className='flex items-center gap-1'>
        <Image src='/assets/images/site-logo.svg' width={23} height={23} alt='ChenFlow' />

        <p className='text-2xl font-bold leading-[31.2px] font-spaceGrotesk max-sm:hidden'>
          Demo<span className='text-primary'>Hotel</span>
        </p>
      </Link>
      {/* <GlobalSearch /> */}
      <div className='flex justify-between items-center gap-5'>
        {/* <Theme /> */}
        {/* <SignedIn>
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'h-10 w-10'
            },
            variables: {
              colorPrimary: '#ff7000'
            }
          }}
        />
      </SignedIn>
      <MobileNavbar /> */}
      </div>
    </nav>
  )
}

export default NavBar
