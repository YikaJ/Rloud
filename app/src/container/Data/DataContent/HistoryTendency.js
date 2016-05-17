/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {Row, Col, Select} from 'antd'
import {LineChart, BarChart, AreaChart} from 'component/MyChart'
import autobind from 'myUtil/autobind'
import {changeHistoryChartType, getHistoryData, changeDataType} from 'action/chartData'

class HistoryTendency extends Component {

  @autobind
  changeChartType(value) {
    this.props.dispatch(changeHistoryChartType(value))
  }

  @autobind
  changeDataType(value) {
    this.props.dispatch(changeDataType(value))
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
    const {historyChartType, dataType = 'todayAverage'} = this.props

    const kindOfChart = {
      line: {component: <LineChart data={device[dataType]} type="linear" height={350} device={device}/>, name: '折线图'},
      bar: {component: <BarChart data={device[dataType]} height={350} device={device}/>, name: '柱状图'},
      area: {component: <AreaChart data={device[dataType]} height={350} device={device}/>, name: '区域图'}
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
            <Select id="date" defaultValue="今天" style={{ width: 80 }} onSelect={this.changeDataType}>
              <Option value="todayAverage">今天</Option>
              <Option value="_7Average">7天</Option>
              <Option value="_14Average">14天</Option>
              <Option value="_30Average">30天</Option>
            </Select>
          </div>

        </h3>

        <div className="chart">
          {kindOfChart[historyChartType].component}
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
