'use client'

import React from 'react'
import {BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip, LineChart, Line} from 'recharts'
export default function Graph({res, ddata}) {
    // console.log(res, ddata, "DDATA")
  return (
    <div>
    <ResponsiveContainer width={950} height={500}>

      <LineChart width={950} height={500} data={res}>
        <XAxis dataKey={ddata || "DEL_DATE"}/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Line dataKey="CUM_DELAY" fill='#EA580C'stroke='#EA580C' type='monotone'/>
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}
