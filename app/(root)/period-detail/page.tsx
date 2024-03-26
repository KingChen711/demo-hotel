import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

function PeriodDetail() {
  return (
    <>
      <h1 className='text-[30px] font-bold leading-[42px] tracking-tighter'>Period Detail</h1>

      <div className='grid w-full custom-scrollbar'>
        <div className='overflow-x-auto'>
          <Table className='mt-6 rounded-xl overflow-hidden'>
            <TableHeader className='bg-primary'>
              <TableRow>
                <TableHead className='text-primary-foreground whitespace-nowrap'>Code</TableHead>
                <TableHead className='text-primary-foreground whitespace-nowrap'>Total Room in Hotel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='bg-card shadow-xl'>
              <TableRow>
                <TableCell className='font-medium'>SHA</TableCell>
                <TableCell className='text-center'>500</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default PeriodDetail
