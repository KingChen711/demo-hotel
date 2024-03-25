import React from 'react'
import data from '@/database/reservation-forecast-chart-data.json'

import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'
import ReservationForestChart from '@/components/shared/reservation-forecast-chart'
import { getReservationForecastData } from '@/lib/actions/reservation-forecast'

type Props = {
  searchParams: {
    period?: string
  }
}

async function ReservationForecast({ searchParams }: Props) {
  const period = searchParams.period || '30'
  const data = await getReservationForecastData(Number(period))

  return (
    <>
      <h1 className='text-[30px] font-bold leading-[42px] tracking-tighter'>Reservation Forecast</h1>

      <ReservationForestChart data={data} />
    </>
  )
}

export default ReservationForecast
