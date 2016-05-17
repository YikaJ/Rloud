/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {Row, Col, Select} from 'antd'
import {LineChart, BarChart, AreaChart} from 'component/MyChart'
import autobind from 'myUtil/autobind'
import {changeChartType, getHistoryData} from 'action/chartData'

class HistoryTendency extends Component {

  @autobind
  changeChartType(value) {
    this.props.dispatch(changeChartType(value))
  }

  componentDidMount() {
    const {dispatch, deviceId} = this.props
    dispatch(getHistoryData(deviceId))
  }

  render() {
    const {device} = this.props

    return(
      <div className="data-content-container">
        <h2 className="data-content-title">历史趋势</h2>
        <div className="data-content">
          {this.renderDataChart(device)}
        </div>
      </div>
    )
  }

  renderDataChart(device) {
    const {chartType} = this.props

    const kindOfChart = {
      line: {component: <LineChart data={device.todayAverage} type="linear" height={350} device={device}/>, name: '折线图'},
      bar: {component: <BarChart data={device.todayAverage} height={350} device={device}/>, name: '柱状图'},
      area: {component: <AreaChart data={device.todayAverage} height={350} device={device}/>, name: '区域图'}
    }

    return (
      <div className="data-chart">
        <h3>
          <div>
            <span>数据图表</span>&emsp;
            <Select id="type" defaultValue="line" style={{ width: 80 }} onSelect={this.changeChartType}>
              {Object.keys(kindOfChart).map((value)=>{
                return <Option key={value} value={value}>{kindOfChart[value].name}</Option>
              })}
            </Select>&emsp;
            <Select id="date" defaultValue="今天" style={{ width: 80 }} onSelect={this.changeChartType}>
              <Option value="today">今天</Option>
              <Option value="7">7天</Option>
              <Option value="15">15天</Option>
              <Option value="30">30天</Option>
            </Select>
          </div>

        </h3>

        <div className="chart">
          {kindOfChart[chartType].component}
        </div>
      </div>
    )
  }
}

HistoryTendency.defaultProps = {
  device: {
    data: [],
    chartOption: {
      dataItemList: []
    }
  }
}

export default HistoryTendency
