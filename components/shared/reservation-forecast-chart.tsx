'use client'

import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'
import { ReservationForecastData } from '@/types'

type Props = {
  data: ReservationForecastData
}

function ReservationForestChart({ data }: Props) {
  const searchParams = useSearchParams()
  const period = searchParams.get('period') || '30'
  const router = useRouter()

  const handlePeriodChange = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'period',
      value: value
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <>
      <div className='flex items-center gap-4 mt-8'>
        <h3 className='font-medium text-xl'>Period:</h3>
        <Select onValueChange={(value: string) => handlePeriodChange(value)} defaultValue={period}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select period...' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='30'>This month</SelectItem>
            <SelectItem value='90'>3 months</SelectItem>
            <SelectItem value='180'>6 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width='100%' height={500} className='mt-8'>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='totalOcc' stroke='#da783f' />
          <Line type='monotone' dataKey='arrRooms' stroke='#8884d8' />
          <Line type='monotone' dataKey='depRooms' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default ReservationForestChart
