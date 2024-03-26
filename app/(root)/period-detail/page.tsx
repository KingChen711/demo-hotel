import PeriodDetailTable from '@/components/shared/period-detail-table'
import { Button } from '@/components/ui/button'
import { getPeriodDetail } from '@/lib/actions/period-detail'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function PeriodDetail() {
  const data = await getPeriodDetail()

  return (
    <>
      <h1 className='text-[30px] font-bold leading-[42px] tracking-tighter'>Period Detail</h1>

      <div className='flex items-center justify-between mt-6 mb-4'>
        <div className='font-medium text-2xl mb-2'>Expected and Actual Meal Count and Sales</div>

        <Button className='float-right' asChild>
          <Link href='/api/excel/period-detail'>
            <Image alt='export' src='/assets/icons/export.svg' height={18} width={18} className='mr-1 invert-colors' />
            Export
          </Link>
        </Button>
      </div>

      <PeriodDetailTable data={data} />
    </>
  )
}

export default PeriodDetail
