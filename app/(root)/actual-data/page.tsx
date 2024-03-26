import PropertyFilter from '@/components/property-filter'
import RevenueBarChart from '@/components/shared/revenue-bar-chart'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getPropertiesByCodes, getAllPropertyCodes, getRevenueBarChartData } from '@/lib/actions/actual-data'
import { formatNumber } from '@/lib/utils'
import Image from 'next/image'
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
  const chartData = await getRevenueBarChartData(selectedProperties)

  const grandTotal = {
    totalRoomInHotel: 0,
    roomRevenue: 0,
    fnbRevenue: 0,
    otherRevenue: 0,
    totalRevenue: 0,
    occ: 0,
    adr: 0,
    hotelRoom: 0,
    availableRoom: 0,
    revenue: {
      occupiedRoom: 0,
      groupRoom: 0,
      transientRoom: 0
    }
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
    grandTotal.revenue.occupiedRoom += property.revenue.occupiedRoom
    grandTotal.revenue.groupRoom += property.revenue.groupRoom
    grandTotal.revenue.transientRoom += property.revenue.transientRoom
  })

  return (
    <>
      <h1 className='text-[30px] font-bold leading-[42px] tracking-tighter'>Actual Data</h1>

      <PropertyFilter propertyCodes={propertyCodes} />

      {properties.length > 0 ? (
        <>
          <div className='grid w-full custom-scrollbar'>
            <div className='overflow-x-auto'>
              <Table className='mt-6 rounded-md overflow-hidden'>
                <TableHeader className='bg-primary'>
                  <TableRow>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>Code</TableHead>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>Total Room in Hotel</TableHead>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>Room Revenue</TableHead>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>F&B Revenue</TableHead>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>Other Revenue</TableHead>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>Total Revenue</TableHead>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>Occ %</TableHead>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>ADR</TableHead>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>Hotel Room</TableHead>
                    <TableHead className='text-primary-foreground whitespace-nowrap'>Available Rooms</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='bg-card shadow-xl'>
                  {properties.map((property) => {
                    return (
                      <TableRow key={property.id}>
                        <TableCell className='font-medium'>{property.code}</TableCell>
                        <TableCell className='text-center'>{formatNumber(property.totalRoomInHotel)}</TableCell>
                        <TableCell className='text-center'>${formatNumber(property.roomRevenue)}</TableCell>
                        <TableCell className='text-center'>${formatNumber(property.fnbRevenue)}</TableCell>
                        <TableCell className='text-center'>${formatNumber(property.otherRevenue)}</TableCell>
                        <TableCell className='text-center'>
                          ${formatNumber(property.roomRevenue + property.fnbRevenue + property.otherRevenue)}
                        </TableCell>
                        <TableCell className='text-center'>{formatNumber(property.occ)}%</TableCell>
                        <TableCell className='text-center'>{formatNumber(property.adr)}</TableCell>
                        <TableCell className='text-center'>{formatNumber(property.hotelRoom)}</TableCell>
                        <TableCell className='text-center'>{formatNumber(property.availableRoom)}</TableCell>
                      </TableRow>
                    )
                  })}
                  <TableRow>
                    <TableCell className='font-bold whitespace-nowrap'>Grand Total</TableCell>
                    <TableCell className='text-center'>{formatNumber(grandTotal.totalRoomInHotel)}</TableCell>
                    <TableCell className='text-center'>${formatNumber(grandTotal.roomRevenue)}</TableCell>
                    <TableCell className='text-center'>${formatNumber(grandTotal.fnbRevenue)}</TableCell>
                    <TableCell className='text-center'>${formatNumber(grandTotal.otherRevenue)}</TableCell>
                    <TableCell className='text-center'>${formatNumber(grandTotal.totalRevenue)}</TableCell>
                    <TableCell className='text-center'>{formatNumber(grandTotal.occ)}%</TableCell>
                    <TableCell className='text-center'>{formatNumber(grandTotal.adr)}</TableCell>
                    <TableCell className='text-center'>{formatNumber(grandTotal.hotelRoom)}</TableCell>
                    <TableCell className='text-center'>{formatNumber(grandTotal.availableRoom)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <RevenueBarChart data={chartData} />
        </>
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
        managing your hotel efficiently. Your choices pave the way for seamless operations and satisfied guests.
        Don&apos;t wait, take action and elevate your management game! 🌟
      </p>
    </div>
  )
}
