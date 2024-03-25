'use client'

import React from 'react'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'

type Props = {
  propertyCodes: string[]
}

function PropertyCodeContainer({ propertyCodes }: Props) {
  const searchParams = useSearchParams()
  const selectedProperties = searchParams.get('selected_properties')?.split(',') || []
  const router = useRouter()

  const handleSelectProperty = (propertyCode: string) => {
    let newSelectedProperties = [...selectedProperties] //clone
    //toggle
    if (selectedProperties.includes(propertyCode)) {
      newSelectedProperties = selectedProperties.filter((item) => item !== propertyCode) as string[]
    } else {
      newSelectedProperties.push(propertyCode)
    }

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'selected_properties',
      value: newSelectedProperties.join(',')
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <div>
      {propertyCodes.map((propertyCode) => {
        return (
          <Button onClick={() => handleSelectProperty(propertyCode)} key={propertyCode}>
            {propertyCode}
          </Button>
        )
      })}
    </div>
  )
}

export default PropertyCodeContainer
