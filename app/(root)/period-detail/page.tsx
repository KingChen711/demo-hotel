import PeriodDetailTable from '@/components/shared/period-detail-table'
import { Button } from '@/components/ui/button'
import { getPeriodDetail } from '@/lib/actions/period-detail'
import Image from 'next/image'
import React from 'react'

async function PeriodDetail() {
  const data = await getPeriodDetail()

  return (
    <>
      <h1 className='text-[30px] font-bold leading-[42px] tracking-tighter'>Period Detail</h1>

      <Button className='float-right'>
        <Image alt='export' src='/assets/icons/export.svg' height={18} width={18} className='mr-1 invert-colors' />
        Export
      </Button>

      <div className='mt-10 font-medium text-2xl mb-2'>Expected and Actual Meal Count and Sales</div>
      <PeriodDetailTable data={data} />
    </>
  )
}

export default PeriodDetail
