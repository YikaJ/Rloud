/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts'
import {randomColor} from 'myUtil/random'

class MyLineChart extends Component {

  render() {
    const {isRealTime, device} = this.props

    const {chartOption: {dataItemList}, data = []} = device
    // 只取最新的后十个数据
    const sliceData = data.slice(-10)

    return (
      <LineChart margin={{top: 30}} width={1000} height={250} data={sliceData}>
        <XAxis dataKey="xAxisName" label="时间轴" unit="秒"/>
        <YAxis />
        <Tooltip />
        <Legend />
        {dataItemList.map((itemName, index) => {
          return (
            <Line dataKey={itemName || 'data'} key={index} stroke={randomColor(index)} strokeWidth="1.5" isAnimationActive={!isRealTime} type="monotone" activeDot={{r: 8}}/>
          )
        })}
      </LineChart>
    )
  }
}

export default MyLineChart