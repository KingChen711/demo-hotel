import { type NextRequest } from 'next/server'
import * as XLSX from 'xlsx'

// For loading example data
import { promises as fs } from 'fs'
import { ReportDetail } from '@/types'

type PeriodDetailExcelRow = {
  Date?: string
  RCV?: string
  Period?: string
  'Count Adults': number | string
  'Count Children': number | string
  'Sales Adults': number | string
  'Sales Children': number | string
  Count: number | string
  'Count %'?: number
  Sales?: number
  'Sales %'?: number
}

const periodDetailDataToRowExcel = (jsonTableData: ReportDetail[]) => {
  const result: PeriodDetailExcelRow[] = []
  jsonTableData.forEach((date) => {
    result.push({
      Date: date.report_date,
      'Count Adults': date.total.adults_actual.count,
      'Count Children': date.total.children_actual.count,
      'Sales Adults': date.total.adults_actual.sales,
      'Sales Children': date.total.children_actual.sales,
      Count: date.total.total_actual.count,
      'Count %': date.total.total_actual.percentage_count,
      Sales: date.total.total_actual.sales,
      'Sales %': date.total.total_actual.percentage_sales
    })

    date.outlet.forEach((outlet) => {
      result.push({
        RCV: outlet.outlet_code,
        'Count Adults': outlet.total.adults_actual.count,
        'Count Children': outlet.total.children_actual.count,
        'Sales Adults': outlet.total.adults_actual.sales,
        'Sales Children': outlet.total.children_actual.sales,
        Count: outlet.total.total_actual.count,
        'Count %': outlet.total.total_actual.percentage_count,
        Sales: outlet.total.total_actual.sales,
        'Sales %': outlet.total.total_actual.percentage_sales
      })

      result.push({
        Period: 'Breakfast',
        'Count Adults': outlet.breakfast.total.adults_actual.count,
        'Count Children': outlet.breakfast.total.children_actual.count,
        'Sales Adults': outlet.breakfast.total.adults_actual.sales,
        'Sales Children': outlet.breakfast.total.children_actual.sales,
        Count: outlet.breakfast.total.total_actual.count,
        'Count %': outlet.breakfast.total.total_actual.percentage_count,
        Sales: outlet.breakfast.total.total_actual.sales,
        'Sales %': outlet.breakfast.total.total_actual.percentage_sales
      })

      result.push({
        'Count Adults': 'Room',
        'Count Children': 'Guest Names',
        'Sales Adults': 'Pax',
        'Sales Children': 'Time',
        Count: 'Remark'
      })

      Object.keys(outlet.breakfast.records).map((key) => {
        const record = outlet.breakfast.records[key]
        result.push({
          'Count Adults': record.room,
          'Count Children': record.guest_names,
          'Sales Adults': record.pax,
          'Sales Children': key,
          Count: record.remark
        })
      })

      result.push({
        Period: 'Lunch',
        'Count Adults': outlet.lunch.total.adults_actual.count,
        'Count Children': outlet.lunch.total.children_actual.count,
        'Sales Adults': outlet.lunch.total.adults_actual.sales,
        'Sales Children': outlet.lunch.total.children_actual.sales,
        Count: outlet.lunch.total.total_actual.count,
        'Count %': outlet.lunch.total.total_actual.percentage_count,
        Sales: outlet.lunch.total.total_actual.sales,
        'Sales %': outlet.lunch.total.total_actual.percentage_sales
      })

      result.push({
        'Count Adults': 'Room',
        'Count Children': 'Guest Names',
        'Sales Adults': 'Pax',
        'Sales Children': 'Time',
        Count: 'Remark'
      })

      Object.keys(outlet.lunch.records).map((key) => {
        const record = outlet.lunch.records[key]
        result.push({
          'Count Adults': record.room,
          'Count Children': record.guest_names,
          'Sales Adults': record.pax,
          'Sales Children': key,
          Count: record.remark
        })
      })

      result.push({
        Period: 'Dinner',
        'Count Adults': outlet.dinner.total.adults_actual.count,
        'Count Children': outlet.dinner.total.children_actual.count,
        'Sales Adults': outlet.dinner.total.adults_actual.sales,
        'Sales Children': outlet.dinner.total.children_actual.sales,
        Count: outlet.dinner.total.total_actual.count,
        'Count %': outlet.dinner.total.total_actual.percentage_count,
        Sales: outlet.dinner.total.total_actual.sales,
        'Sales %': outlet.dinner.total.total_actual.percentage_sales
      })

      result.push({
        'Count Adults': 'Room',
        'Count Children': 'Guest Names',
        'Sales Adults': 'Pax',
        'Sales Children': 'Time',
        Count: 'Remark'
      })

      Object.keys(outlet.dinner.records).map((key) => {
        const record = outlet.dinner.records[key]
        result.push({
          'Count Adults': record.room,
          'Count Children': record.guest_names,
          'Sales Adults': record.pax,
          'Sales Children': key,
          Count: record.remark
        })
      })
    })
  })
  return result
}

export async function GET(request: NextRequest) {
  try {
    // Loading example data
    const file = await fs.readFile(process.cwd() + '/database/sampledata-meal-detail.json', 'utf8')
    const jsonTableData = JSON.parse(file) as ReportDetail[]

    const result: PeriodDetailExcelRow[] = periodDetailDataToRowExcel(jsonTableData)

    // Define the order of columns
    const columnOrder = [
      'Date',
      'RCV',
      'Period',
      'Count Adults',
      'Count Children',
      'Sales Adults',
      'Sales Children',
      'Count',
      'Count %',
      'Sales',
      'Sales %'
    ] as const

    // Reorder the columns in each row of the data
    const reorderedResult = result.map((row) => {
      const reorderedRow: any = {}
      columnOrder.forEach((column) => {
        reorderedRow[column] = row[column]
      })
      return reorderedRow
    })

    const worksheet = XLSX.utils.json_to_sheet(reorderedResult)

    // Apply style to header row (assumed to be the first row)
    worksheet['!cols'] = [
      { wch: 15 },
      { wch: 10 },
      { wch: 15 },
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 }
    ] // Set column widths

    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, 'MySheet')

    const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="period-detail.xlsx"`,
        'Content-Type': 'application/vnd.ms-excel'
      }
    })
  } catch (e) {
    if (e instanceof Error) {
      console.error(e)
      return new Response(e.message, {
        status: 400
      })
    }
  }
}
