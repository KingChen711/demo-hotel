'use server'
import data from '@/database/sampledata-meal-detail.json'

import { ReportDetail, User } from '@/types'

export const getPeriodDetail = async (): Promise<ReportDetail[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      //@ts-ignore
      return resolve(data as ReportDetail[])
    }, 300)
  }) //fake fetching
}
