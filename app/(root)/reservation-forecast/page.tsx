import React from 'react'
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
