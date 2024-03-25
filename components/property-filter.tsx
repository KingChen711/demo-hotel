'use client'

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn, formUrlQuery } from '@/lib/utils'
import { PopoverClose } from '@radix-ui/react-popover'

type Props = {
  propertyCodes: string[]
}

function PropertyFilter({ propertyCodes }: Props) {
  const searchParams = useSearchParams()
  const [selectedProperties, setSelectedProperties] = useState<string[]>(
    searchParams.get('selected_properties')?.split(',') || []
  )
  const router = useRouter()

  const handleSelectProperty = (propertyCode: string) => {
    //toggle
    if (selectedProperties.includes(propertyCode)) {
      setSelectedProperties((prev) => prev.filter((item) => item !== propertyCode) as string[])
    } else {
      setSelectedProperties((prev) => [...prev, propertyCode])
    }
  }

  const handleClickResult = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'selected_properties',
      value: selectedProperties.join(',')
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='mt-4'>
          <Image alt='filter' src='/assets/icons/filter.svg' width={16} height={16} className='mr-2' />
          Filter Property
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-2 w-80'>
        <div className='flex flex-wrap gap-2'>
          {propertyCodes.map((propertyCode) => {
            const isSelected = selectedProperties.includes(propertyCode)
            return (
              <Button
                variant={isSelected ? 'secondary' : 'outline'}
                className={cn(isSelected && 'border-primary border')}
                onClick={() => handleSelectProperty(propertyCode)}
                key={propertyCode}
              >
                {propertyCode}
              </Button>
            )
          })}
        </div>

        <div className='flex gap-2'>
          <PopoverClose asChild>
            <Button className='w-full' variant='secondary'>
              Cancel
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button onClick={handleClickResult} className='w-full'>
              Result
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PropertyFilter
