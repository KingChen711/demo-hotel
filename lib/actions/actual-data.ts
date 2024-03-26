'use server'

import { Property, RevenueBarChartData } from '@/types'
import actualData from '@/database/actual-data.json'

export const getAllPropertyCodes = async (): Promise<string[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const propertyCodes = actualData.map((property) => property.code)
      return resolve(propertyCodes as string[])
    }, 500)
  }) //fake fetching
}

export const getPropertiesByCodes = async (codes: string[]): Promise<Property[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const propertyCodes = actualData.filter((property) => codes.includes(property.code))
      return resolve(propertyCodes as Property[])
    }, 500)
  }) //fake fetching
}

export const getRevenueBarChartData = async (codes: string[]): Promise<RevenueBarChartData> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const data: RevenueBarChartData = []

      actualData
        .filter((property) => codes.includes(property.code))
        .forEach((record) => {
          data.push({
            name: record.code,
            groupRoom: record.revenue.groupRoom,
            occupiedRoom: record.revenue.occupiedRoom,
            transientRoom: record.revenue.transientRoom
          })
        })

      return resolve(data)
    }, 500)
  }) //fake fetching
}
