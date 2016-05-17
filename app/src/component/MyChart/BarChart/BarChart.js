/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from 'recharts'
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
        <Tooltip />
        <Legend />
        {dataItemList.map((itemName, index) => {
          return (
            <Bar dataKey={itemName || 'data'} key={index} fill={randomColor(index)} strokeWidth="1.5" isAnimationActive={!isRealTime} type="monotone" activeDot={{r: 8}}/>
          )
        })}
      </BarChart>
    )
  }
}

export default MyBarChart