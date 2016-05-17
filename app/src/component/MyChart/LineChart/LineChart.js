/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts'
import {randomColor} from 'myUtil/random'

class MyLineChart extends Component {

  render() {
    const {
      isRealTime, device, height = 250,
      type = 'monotone', data = []
    } = this.props

    const {chartOption: {dataItemList}} = device
    // 只取最新的后十个数据

    return (
      <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }} width={1000} height={height} data={data}>
        <XAxis dataKey="xAxisName" label="时间轴" unit="秒"/>
        <YAxis />
        <Tooltip />
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