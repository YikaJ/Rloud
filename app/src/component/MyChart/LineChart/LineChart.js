/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from 'recharts'
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
        <CartesianGrid strokeDasharray="3 3"/>
        <Legend />
        {dataItemList.map((itemName, index) => {
          return (
            <Line dataKey={itemName || 'data'} key={index} stroke={randomColor(index)} strokeWidth="1.2" isAnimationActive={!isRealTime} type={type} activeDot={{r: 8}}/>
          )
        })}
      </LineChart>
    )
  }
}

export default MyLineChart