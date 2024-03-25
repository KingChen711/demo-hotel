'use server'

import { Property } from '@/types'
import actualData from '../data/actual-data.json'

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
