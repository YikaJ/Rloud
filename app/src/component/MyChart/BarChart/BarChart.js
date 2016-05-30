/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine} from 'recharts'
import {randomColor} from 'myUtil/random'

class MyBarChart extends Component {

  render() {
    const {isRealTime, device, height = 250, data} = this.props

    const {chartOption: {dataItemList, yAxisName}} = device

    return (
      <BarChart margin={{ top: 30, right: 30, left: 20, bottom: 5 }} width={1000} height={height} data={data}>
        <XAxis dataKey="xAxisName" label="时间轴" unit="秒"/>
        <YAxis label={yAxisName}/>
        <CartesianGrid strokeDasharray="3 3"/>
        {dataItemList.map(({min}, index) => {
          return (
            min ? <ReferenceLine y={+min} label="最小值" stroke={randomColor(index)} strokeDasharray="20,10,5,5,5,10" alwaysShow/> : ''
          )
        })}
        {dataItemList.map(({max}, index) => {
          return (
            max ? <ReferenceLine y={+max} label="最大值" stroke={randomColor(index)} strokeDasharray="20,10,5,5,5,10" alwaysShow/> : ''
          )
        })}
        <Tooltip />
        <Legend />
        {dataItemList.map(({name}, index) => {
          return (
            <Bar dataKey={name || 'data'} key={index} fill={randomColor(index)} strokeWidth="1.5" isAnimationActive={!isRealTime} type="monotone" activeDot={{r: 8}}/>
          )
        })}
      </BarChart>
    )
  }
}

export default MyBarChart