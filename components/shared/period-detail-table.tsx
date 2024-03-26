'use client'

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { formatNumber } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { v4 as uuidv4 } from 'uuid'
import { ReportDetail } from '@/types'

type Props = {
  data: ReportDetail[]
}

type RowType = 'date' | 'outlet' | 'period'

type RowInfor = {
  open: boolean
  type: RowType
}

const PeriodDetailTable = ({ data }: Props) => {
  const [rowIdToRowInfor, setRowIdToRowInfor] = useState<Record<string, RowInfor>>({})
  const [isAssignedRowId, setIsAssignedRowId] = useState(false)
  const [reports, setReports] = useState<ReportDetail[]>(data)
  const [hideColRcv, setHideColRcv] = useState(true)
  const [hideColPeriod, setHideColPeriod] = useState(true)

  //assign row id
  useEffect(() => {
    setReports((prevReports) => {
      prevReports.forEach((date) => {
        date.rowId = date.rowId || uuidv4()

        date.outlet.forEach((outlet) => {
          outlet.rowId = outlet.rowId || uuidv4()
          outlet.breakfast.rowId = outlet.breakfast.rowId || uuidv4()
          outlet.lunch.rowId = outlet.lunch.rowId || uuidv4()
          outlet.dinner.rowId = outlet.dinner.rowId || uuidv4()
        })
      })

      return prevReports
    })
  }, [])

  //init the mapping rowIdToRowInfor
  useEffect(() => {
    if (reports.length === 0 || !reports[0].rowId) {
      return
    }

    const newRowIdToRowInfor: Record<string, RowInfor> = {}

    reports.forEach((date) => {
      newRowIdToRowInfor[date.rowId!] = {
        open: false,
        type: 'date'
      }

      date.outlet.forEach((outlet) => {
        newRowIdToRowInfor[outlet.rowId!] = {
          open: false,
          type: 'outlet'
        }
        newRowIdToRowInfor[outlet.breakfast.rowId!] = {
          open: false,
          type: 'period'
        }
        newRowIdToRowInfor[outlet.lunch.rowId!] = {
          open: false,
          type: 'period'
        }
        newRowIdToRowInfor[outlet.dinner.rowId!] = {
          open: false,
          type: 'period'
        }
      })
    })

    setRowIdToRowInfor(newRowIdToRowInfor)
    setIsAssignedRowId(true)
  }, [reports])

  //check hide column RCV
  useEffect(() => {
    setHideColRcv(!Object.values(rowIdToRowInfor).find((row) => row.type === 'date' && row.open))
  }, [rowIdToRowInfor])

  //check hide column Period
  useEffect(() => {
    setHideColPeriod(hideColRcv || !Object.values(rowIdToRowInfor).find((row) => row.type === 'outlet' && row.open))
  }, [rowIdToRowInfor, hideColRcv])

  const handleToggleRow = (rowId: string) => {
    const newRowIdToRowInfor = { ...rowIdToRowInfor }
    newRowIdToRowInfor[rowId] = {
      ...newRowIdToRowInfor[rowId],
      open: !newRowIdToRowInfor[rowId].open
    }
    setRowIdToRowInfor(newRowIdToRowInfor)
  }

  if (!isAssignedRowId) return null

  return (
    <div className='grid w-full custom-scrollbar'>
      <div className='overflow-x-auto'>
        <Table className='rounded-md overflow-hidden'>
          <TableHeader className='bg-primary'>
            <TableRow>
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap'></TableHead>
              {!hideColRcv && <TableHead className='text-primary-foreground font-bold whitespace-nowrap'></TableHead>}
              {!hideColPeriod && (
                <TableHead className='text-primary-foreground font-bold whitespace-nowrap'></TableHead>
              )}
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>Date</TableHead>
              {!hideColRcv && (
                <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>RVC</TableHead>
              )}
              {!hideColPeriod && (
                <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>Period</TableHead>
              )}
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>A.Count</TableHead>
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>C.Count</TableHead>
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>A.Sales</TableHead>
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>C.Sales</TableHead>
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>Count</TableHead>
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>Count %</TableHead>
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>Sales</TableHead>
              <TableHead className='text-primary-foreground font-bold whitespace-nowrap text-right'>Sales %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-card shadow-xl'>
            {reports.map((record) => {
              const isOpenDate = rowIdToRowInfor[record.rowId!].open
              return (
                <>
                  <TableRow key={record.rowId} className='relative'>
                    <TableCell className='text-center'>
                      <Button onClick={() => handleToggleRow(record.rowId!)} variant='secondary' size='icon'>
                        {isOpenDate ? <Minus /> : <Plus />}
                      </Button>
                    </TableCell>
                    {!hideColRcv && <TableCell></TableCell>}
                    {!hideColPeriod && <TableCell></TableCell>}
                    <TableCell className='text-right whitespace-nowrap'>{record.report_date}</TableCell>
                    {!hideColRcv && <TableCell className='text-right whitespace-nowrap'></TableCell>}
                    {!hideColPeriod && <TableCell className='text-right whitespace-nowrap'></TableCell>}
                    <TableCell className='text-right whitespace-nowrap'>
                      {formatNumber(record.total.adults_actual.count)}
                    </TableCell>
                    <TableCell className='text-right whitespace-nowrap'>
                      {formatNumber(record.total.children_actual.count)}
                    </TableCell>
                    <TableCell className='text-right whitespace-nowrap'>
                      {formatNumber(record.total.adults_actual.sales)}
                    </TableCell>
                    <TableCell className='text-right whitespace-nowrap'>
                      {formatNumber(record.total.children_actual.sales)}
                    </TableCell>
                    <TableCell className='text-right whitespace-nowrap'>
                      {formatNumber(record.total.total_actual.count)}
                    </TableCell>
                    <TableCell className='text-right whitespace-nowrap'>
                      {formatNumber(record.total.total_actual.percentage_count)}%
                    </TableCell>
                    <TableCell className='text-right whitespace-nowrap'>
                      {formatNumber(record.total.total_actual.sales)}
                    </TableCell>
                    <TableCell className='text-right whitespace-nowrap'>
                      {formatNumber(record.total.total_actual.percentage_sales)}%
                    </TableCell>
                  </TableRow>

                  {isOpenDate &&
                    record.outlet.map((outlet) => {
                      const isOpenOutlet = rowIdToRowInfor[outlet.rowId!].open
                      const isOpenBreakfast = rowIdToRowInfor[outlet.breakfast.rowId!].open
                      const isOpenLunch = rowIdToRowInfor[outlet.lunch.rowId!].open
                      const isOpenDinner = rowIdToRowInfor[outlet.dinner.rowId!].open
                      return (
                        <>
                          <TableRow key={outlet.rowId}>
                            <TableCell className='text-right'></TableCell>
                            <TableCell className='text-center'>
                              <Button onClick={() => handleToggleRow(outlet.rowId!)} variant='secondary' size='icon'>
                                {isOpenOutlet ? <Minus /> : <Plus />}
                              </Button>
                            </TableCell>
                            <TableCell className='text-right'></TableCell>
                            {!hideColPeriod && <TableCell className='text-right'></TableCell>}
                            <TableCell className='text-right'>{outlet.outlet_code}</TableCell>
                            {!hideColPeriod && <TableCell className='text-right whitespace-nowrap'></TableCell>}
                            <TableCell className='text-right'>
                              {formatNumber(outlet.total.adults_actual.count)}
                            </TableCell>
                            <TableCell className='text-right'>
                              {formatNumber(outlet.total.children_actual.count)}
                            </TableCell>
                            <TableCell className='text-right'>
                              {formatNumber(outlet.total.adults_actual.sales)}
                            </TableCell>
                            <TableCell className='text-right'>
                              {formatNumber(outlet.total.children_actual.sales)}
                            </TableCell>
                            <TableCell className='text-right'>
                              {formatNumber(outlet.total.total_actual.count)}
                            </TableCell>
                            <TableCell className='text-right'>
                              {formatNumber(outlet.total.total_actual.percentage_count)}%
                            </TableCell>
                            <TableCell className='text-right'>
                              {formatNumber(outlet.total.total_actual.sales)}
                            </TableCell>
                            <TableCell className='text-right'>
                              {formatNumber(outlet.total.total_actual.percentage_sales)}%
                            </TableCell>
                          </TableRow>

                          {isOpenOutlet && (
                            <>
                              <TableRow>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-center'>
                                  <Button
                                    onClick={() => handleToggleRow(outlet.breakfast.rowId!)}
                                    variant='secondary'
                                    size='icon'
                                  >
                                    {isOpenBreakfast ? <Minus /> : <Plus />}
                                  </Button>
                                </TableCell>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-right'>Breakfast</TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.breakfast.total.adults_actual.count)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.breakfast.total.children_actual.count)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.breakfast.total.adults_actual.sales)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.breakfast.total.children_actual.sales)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.breakfast.total.total_actual.count)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.breakfast.total.total_actual.percentage_count)}%
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.breakfast.total.total_actual.sales)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.breakfast.total.total_actual.percentage_sales)}%
                                </TableCell>
                              </TableRow>

                              {isOpenBreakfast && (
                                <>
                                  <TableRow className='bg-primary hover:bg-primary'>
                                    <TableCell className='bg-card'></TableCell>
                                    <TableCell className='bg-card'></TableCell>
                                    <TableCell className='bg-card'></TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-center'>
                                      Room
                                    </TableCell>
                                    <TableCell
                                      colSpan={3}
                                      className='text-primary-foreground font-bold whitespace-nowrap text-right'
                                    >
                                      Guest Names
                                    </TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-right'>
                                      Count
                                    </TableCell>
                                    <TableCell
                                      colSpan={2}
                                      className='text-primary-foreground font-bold whitespace-nowrap text-center'
                                    >
                                      Pax
                                    </TableCell>
                                    <TableCell
                                      colSpan={2}
                                      className='text-primary-foreground font-bold whitespace-nowrap text-center'
                                    >
                                      Time
                                    </TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-right'>
                                      Pkg. Code
                                    </TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-right'>
                                      Remark
                                    </TableCell>
                                  </TableRow>

                                  {Object.keys(outlet.breakfast.records).map((key) => {
                                    const value = outlet.breakfast.records[key]

                                    return (
                                      <TableRow key={key}>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className='text-center whitespace-nowrap'>{value.room}</TableCell>
                                        <TableCell colSpan={3} className='text-right whitespace-nowrap'>
                                          {value.guest_names}
                                        </TableCell>
                                        <TableCell className='text-right'>{value.count}</TableCell>
                                        <TableCell colSpan={2} className='text-center whitespace-nowrap'>
                                          {value.pax}
                                        </TableCell>
                                        <TableCell colSpan={2} className='text-center whitespace-nowrap'>
                                          {key}
                                        </TableCell>
                                        <TableCell className='text-center whitespace-nowrap'>
                                          {value.package_code}
                                        </TableCell>
                                        <TableCell className='text-right whitespace-nowrap'>{value.remark}</TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </>
                              )}

                              <TableRow>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-center'>
                                  <Button
                                    onClick={() => handleToggleRow(outlet.lunch.rowId!)}
                                    variant='secondary'
                                    size='icon'
                                  >
                                    {isOpenLunch ? <Minus /> : <Plus />}
                                  </Button>
                                </TableCell>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-right'>Lunch</TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.lunch.total.adults_actual.count)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.lunch.total.children_actual.count)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.lunch.total.adults_actual.sales)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.lunch.total.children_actual.sales)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.lunch.total.total_actual.count)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.lunch.total.total_actual.percentage_count)}%
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.lunch.total.total_actual.sales)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.lunch.total.total_actual.percentage_sales)}%
                                </TableCell>
                              </TableRow>

                              {isOpenLunch && (
                                <>
                                  <TableRow className='bg-primary hover:bg-primary'>
                                    <TableCell className='bg-card'></TableCell>
                                    <TableCell className='bg-card'></TableCell>
                                    <TableCell className='bg-card'></TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-center'>
                                      Room
                                    </TableCell>
                                    <TableCell
                                      colSpan={3}
                                      className='text-primary-foreground font-bold whitespace-nowrap text-right'
                                    >
                                      Guest Names
                                    </TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-right'>
                                      Count
                                    </TableCell>
                                    <TableCell
                                      colSpan={2}
                                      className='text-primary-foreground font-bold whitespace-nowrap text-center'
                                    >
                                      Pax
                                    </TableCell>
                                    <TableCell
                                      colSpan={2}
                                      className='text-primary-foreground font-bold whitespace-nowrap text-center'
                                    >
                                      Time
                                    </TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-right'>
                                      Pkg. Code
                                    </TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-right'>
                                      Remark
                                    </TableCell>
                                  </TableRow>

                                  {Object.keys(outlet.lunch.records).map((key) => {
                                    const value = outlet.lunch.records[key]

                                    return (
                                      <TableRow key={key}>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className='text-center whitespace-nowrap'>{value.room}</TableCell>
                                        <TableCell colSpan={3} className='text-right whitespace-nowrap'>
                                          {value.guest_names}
                                        </TableCell>
                                        <TableCell className='text-right'>{value.count}</TableCell>
                                        <TableCell colSpan={2} className='text-center whitespace-nowrap'>
                                          {value.pax}
                                        </TableCell>
                                        <TableCell colSpan={2} className='text-center whitespace-nowrap'>
                                          {key}
                                        </TableCell>
                                        <TableCell className='text-center whitespace-nowrap'>
                                          {value.package_code}
                                        </TableCell>
                                        <TableCell className='text-right whitespace-nowrap'>{value.remark}</TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </>
                              )}

                              <TableRow>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-center'>
                                  <Button
                                    onClick={() => handleToggleRow(outlet.dinner.rowId!)}
                                    variant='secondary'
                                    size='icon'
                                  >
                                    {isOpenDinner ? <Minus /> : <Plus />}
                                  </Button>
                                </TableCell>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-right'></TableCell>
                                <TableCell className='text-right'>Dinner</TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.dinner.total.adults_actual.count)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.dinner.total.children_actual.count)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.dinner.total.adults_actual.sales)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.dinner.total.children_actual.sales)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.dinner.total.total_actual.count)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.dinner.total.total_actual.percentage_count)}%
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.dinner.total.total_actual.sales)}
                                </TableCell>
                                <TableCell className='text-right'>
                                  {formatNumber(outlet.dinner.total.total_actual.percentage_sales)}%
                                </TableCell>
                              </TableRow>

                              {isOpenDinner && (
                                <>
                                  <TableRow className='bg-primary hover:bg-primary'>
                                    <TableCell className='bg-card'></TableCell>
                                    <TableCell className='bg-card'></TableCell>
                                    <TableCell className='bg-card'></TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-center'>
                                      Room
                                    </TableCell>
                                    <TableCell
                                      colSpan={3}
                                      className='text-primary-foreground font-bold whitespace-nowrap text-right'
                                    >
                                      Guest Names
                                    </TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-right'>
                                      Count
                                    </TableCell>
                                    <TableCell
                                      colSpan={2}
                                      className='text-primary-foreground font-bold whitespace-nowrap text-center'
                                    >
                                      Pax
                                    </TableCell>
                                    <TableCell
                                      colSpan={2}
                                      className='text-primary-foreground font-bold whitespace-nowrap text-center'
                                    >
                                      Time
                                    </TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-right'>
                                      Pkg. Code
                                    </TableCell>
                                    <TableCell className='text-primary-foreground font-bold whitespace-nowrap text-right'>
                                      Remark
                                    </TableCell>
                                  </TableRow>

                                  {Object.keys(outlet.dinner.records).map((key) => {
                                    const value = outlet.dinner.records[key]

                                    return (
                                      <TableRow key={key}>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className='text-center whitespace-nowrap'>{value.room}</TableCell>
                                        <TableCell colSpan={3} className='text-right whitespace-nowrap'>
                                          {value.guest_names}
                                        </TableCell>
                                        <TableCell className='text-right'>{value.count}</TableCell>
                                        <TableCell colSpan={2} className='text-center whitespace-nowrap'>
                                          {value.pax}
                                        </TableCell>
                                        <TableCell colSpan={2} className='text-center whitespace-nowrap'>
                                          {key}
                                        </TableCell>
                                        <TableCell className='text-center whitespace-nowrap'>
                                          {value.package_code}
                                        </TableCell>
                                        <TableCell className='text-right whitespace-nowrap'>{value.remark}</TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )
                    })}
                </>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PeriodDetailTable
