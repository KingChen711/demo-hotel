import PropertyFilter from '@/components/property-filter'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getPropertiesByCodes, getAllPropertyCodes } from '@/lib/actions/actual-data'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'

type Props = {
  searchParams: {
    selected_properties?: string
  }
}

async function ActualDataPage({ searchParams }: Props) {
  const propertyCodes = await getAllPropertyCodes()
  const selectedProperties = searchParams.selected_properties?.split(',') || []
  const properties = await getPropertiesByCodes(selectedProperties)

  const grandTotal = {
    totalRoomInHotel: 0,
    roomRevenue: 0,
    fnbRevenue: 0,
    otherRevenue: 0,
    totalRevenue: 0,
    occ: 0,
    adr: 0,
    hotelRoom: 0,
    availableRoom: 0
  }

  properties.forEach((property) => {
    grandTotal.totalRoomInHotel += property.totalRoomInHotel
    grandTotal.roomRevenue += property.roomRevenue
    grandTotal.fnbRevenue += property.fnbRevenue
    grandTotal.otherRevenue += property.otherRevenue
    grandTotal.totalRevenue += property.roomRevenue + property.fnbRevenue + property.otherRevenue
    grandTotal.occ += property.occ
    grandTotal.adr += property.adr
    grandTotal.hotelRoom += property.hotelRoom
    grandTotal.availableRoom += property.availableRoom
  })

  return (
    <>
      <h1 className='text-[30px] font-bold leading-[42px] tracking-tighter'>Actual Data</h1>

      <PropertyFilter propertyCodes={propertyCodes} />

      {properties.length > 0 ? (
        <Table className='mt-6'>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Total Room in Hotel</TableHead>
              <TableHead>Room Revenue</TableHead>
              <TableHead>F&B Revenue</TableHead>
              <TableHead>Other Revenue</TableHead>
              <TableHead>Total Revenue</TableHead>
              <TableHead>Occ %</TableHead>
              <TableHead>ADR</TableHead>
              <TableHead>Hotel Room</TableHead>
              <TableHead>Available Rooms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => {
              return (
                <TableRow>
                  <TableCell className='font-medium'>{property.code}</TableCell>
                  <TableCell>{property.totalRoomInHotel}</TableCell>
                  <TableCell>${property.roomRevenue}</TableCell>
                  <TableCell>${property.fnbRevenue}</TableCell>
                  <TableCell>${property.otherRevenue}</TableCell>
                  <TableCell>${property.roomRevenue + property.fnbRevenue + property.otherRevenue}</TableCell>
                  <TableCell>{property.occ}%</TableCell>
                  <TableCell>{property.adr}</TableCell>
                  <TableCell>{property.hotelRoom}</TableCell>
                  <TableCell>{property.availableRoom}</TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCell className='font-bold'>Grand Total</TableCell>
              <TableCell>{grandTotal.totalRoomInHotel}</TableCell>
              <TableCell>${grandTotal.roomRevenue.toFixed(2)}</TableCell>
              <TableCell>${grandTotal.fnbRevenue.toFixed(2)}</TableCell>
              <TableCell>${grandTotal.otherRevenue.toFixed(2)}</TableCell>
              <TableCell>${grandTotal.totalRevenue.toFixed(2)}</TableCell>
              <TableCell>{grandTotal.occ.toFixed(2)}%</TableCell>
              <TableCell>{grandTotal.adr.toFixed(2)}</TableCell>
              <TableCell>{grandTotal.hotelRoom}</TableCell>
              <TableCell>{grandTotal.availableRoom}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <NoResult />
      )}
    </>
  )
}

export default ActualDataPage

function NoResult() {
  return (
    <div className='mt-10 flex w-full flex-col items-center justify-center'>
      <div className='rounded-2xl overflow-hidden'>
        <Image
          src='/assets/images/no-result.jpg'
          alt='no result'
          width={270}
          height={270}
          className='block object-contain dark:hidden'
        />
      </div>
      <h2 className='text-[24px] font-bold leading-[31.2px] mt-8'>There are no property have selected</h2>
      <p className='text-[14px] font-normal leading-[19.6px] my-3.5 max-w-md text-center'>
        Take the lead and start organizing your accommodations! 🏨 Select some properties now to get started with
        managing your hotel efficiently. Your choices pave the way for seamless operations and satisfied guests. Don't
        wait, take action and elevate your management game! 🌟
      </p>
    </div>
  )
}
