import PropertyCodeContainer from '@/components/property-codes-container'
import { Button } from '@/components/ui/button'
import { getPropertiesByCodes, getAllPropertyCodes } from '@/lib/actions/actual-data'
import React from 'react'

type Props = {
  searchParams: {
    selected_properties?: string
  }
}

async function ActualDataPage({ searchParams }: Props) {
  const propertyCodes = await getAllPropertyCodes()
  const selectedProperties = searchParams.selected_properties?.split(',') || []
  const properties = await getPropertiesByCodes(selectedProperties)

  return (
    <div>
      <PropertyCodeContainer propertyCodes={propertyCodes} />

      {properties.map((property) => {
        return (
          <Button className='bg-green-500' key={property.id}>
            {property.code}
          </Button>
        )
      })}
    </div>
  )
}

export default ActualDataPage
