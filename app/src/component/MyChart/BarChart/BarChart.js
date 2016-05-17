/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from 'recharts'
import {randomColor} from 'myUtil/random'

class MyBarChart extends Component {

  render() {
    const {isRealTime, device, height = 250, data} = this.props

    const {chartOption: {dataItemList}} = device
    // 只取最新的后十个数据
    const sliceData = data.slice(-10)

    return (
      <BarChart margin={{top: 30}} width={1000} height={height} data={sliceData}>
        <XAxis dataKey="xAxisName" label="时间轴" unit="秒"/>
        <YAxis />
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