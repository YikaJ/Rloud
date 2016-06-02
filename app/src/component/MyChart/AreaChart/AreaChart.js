/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine} from 'recharts'
import {randomColor} from 'myUtil/random'

class MyAreaChart extends Component {

  render() {
    const {isRealTime, device, height = 250, data} = this.props

    const {chartOption: {dataItemList, yAxisName}} = device

    return (
      <AreaChart margin={{ top: 30, right: 30, left: 20, bottom: 5 }} width={1000} height={height} data={data}>
        <XAxis dataKey="xAxisName" label="时间轴" unit="秒"/>
        <YAxis lable={yAxisName} domain={['auto', 'auto']}/>
        <CartesianGrid strokeDasharray="3 3"/>
        {dataItemList.map(({min}, index) => {
          return (
            min ? <ReferenceLine key={index} y={+min} label="最小值" stroke={randomColor(index)} strokeDasharray="20,10,5,5,5,10"/> : ''
          )
        })}
        {dataItemList.map(({max}, index) => {
          return (
            max ? <ReferenceLine key={index} y={+max} label="最大值" stroke={randomColor(index)} strokeDasharray="20,10,5,5,5,10"/> : ''
          )
        })}
        <Tooltip />
        <Legend />
        {dataItemList.map(({name}, index) => {
          return (
            <Area dataKey={name || 'data'} key={index} stroke='#8884d8' fill={randomColor(index)} strokeWidth="1.5" isAnimationActive={!isRealTime} type="monotone" activeDot={{r: 8}}/>
          )
        })}
      </AreaChart>
    )
  }
}

export default MyAreaChart