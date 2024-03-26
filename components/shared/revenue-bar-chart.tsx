'use client'

import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type RevenueBarChartData = {
  name: string
  occupiedRoom: number
  groupRoom: number
  transientRoom: number
}[]

type Props = {
  data: RevenueBarChartData
}

function RevenueBarChart({ data }: Props) {
  return (
    <>
      <div className='mt-10 mb-4 font-medium text-2xl'>Revenue Chart</div>

      <ResponsiveContainer width='100%' height={450}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend
            payload={[
              { id: 'ID01', type: 'square', value: 'Occupied Rooms', color: '#8884d8' },
              { id: 'ID02', type: 'square', value: 'Group Rooms', color: '#82ca9d' },
              { id: 'ID03', type: 'square', value: 'Transient Rooms', color: '#da783f' }
            ]}
          />
          <Bar dataKey='occupiedRoom' fill='#8884d8' />
          <Bar dataKey='groupRoom' fill='#82ca9d' />
          <Bar dataKey='transientRoom' fill='#da783f' />s
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default RevenueBarChart
