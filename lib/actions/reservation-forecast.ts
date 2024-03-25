'use server'

import { ReservationForecastData } from '@/types'
import data from '@/database/reservation-forecast-chart-data.json'

export const getReservationForecastData = async (days: number): Promise<ReservationForecastData> => {
  const today = new Date()
  return await new Promise((resolve) => {
    setTimeout(() => {
      const result = data.filter(
        (record) => (today.getTime() - new Date(record.date).getTime()) / (1000 * 3600 * 24) < days
      )
      return resolve(result as ReservationForecastData)
    }, 500)
  }) //fake fetching
}
