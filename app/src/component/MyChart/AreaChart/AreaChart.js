/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from 'recharts'
import {randomColor} from 'myUtil/random'

class MyAreaChart extends Component {

  render() {
    const {isRealTime, device, height = 250, data} = this.props

    const {chartOption: {dataItemList}} = device
    // 只取最新的后十个数据
    const sliceData = data.slice(-10)

    return (
      <AreaChart margin={{top: 30}} width={1000} height={height} data={sliceData}>
        <XAxis dataKey="xAxisName" label="时间轴" unit="秒"/>
        <YAxis />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip />
        <Legend />
        {dataItemList.map((itemName, index) => {
          return (
            <Area dataKey={itemName || 'data'} key={index} stroke='#8884d8' fill={randomColor(index)} strokeWidth="1.5" isAnimationActive={!isRealTime} type="monotone" activeDot={{r: 8}}/>
          )
        })}
      </AreaChart>
    )
  }
}

export default MyAreaChart