/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine} from 'recharts'
import {randomColor} from 'myUtil/random'

class MyLineChart extends Component {

  render() {
    const {
      isRealTime, device, height = 250,
      type = 'monotone', data = []
    } = this.props

    const {chartOption: {dataItemList, yAxisName, unit}} = device

    return (
      <LineChart margin={{ top: 30, right: 30, left: 20, bottom: 5 }} width={1000} height={height} data={data}>
        <XAxis dataKey="xAxisName" label="时间"/>
        <YAxis label={yAxisName} unit={unit}/>
        <Tooltip />
        {dataItemList.map(({min}, index) => {
          return (
            min ? <ReferenceLine key={index} y={+min} label="最小值" stroke={randomColor(index)} strokeDasharray="20,10,5,5,5,10" alwaysShow/> : ''
          )
        })}
        {dataItemList.map(({max}, index) => {
          return (
            max ? <ReferenceLine key={index} y={+max} label="最大值" stroke={randomColor(index)} strokeDasharray="20,10,5,5,5,10" alwaysShow/> : ''
          )
        })}
        <CartesianGrid strokeDasharray="3 3"/>
        <Legend />
        {dataItemList.map(({name}, index) => {
          return (
            <Line dataKey={name || 'data'} key={index} stroke={randomColor(index)} strokeWidth="1.2" isAnimationActive={!isRealTime} type={type} activeDot={{r: 8}}/>
          )
        })}
      </LineChart>
    )
  }
}

export default MyLineChart