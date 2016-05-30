/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {Row, Col, Select} from 'antd'
import {LineChart, BarChart, AreaChart} from 'component/MyChart'
import socket from 'myUtil/socketio'
import autobind from 'myUtil/autobind'
import {updateDeviceData, changeRealTimeChartType} from 'action/chartData'

class RealTimeData extends Component {

  constructor(props){
  	super(props)

    this.state = {
      realTimeData: []
    }
  }

  @autobind
  changeChartType(value) {
    this.props.dispatch(changeRealTimeChartType(value))
  }

  componentDidMount() {
    socket.on('cden', ({ret, data: {data}}) => {
      if(ret === 0) {
        const {realTimeData} = this.state

        const newData = realTimeData.slice()

        if(newData.length > 10) newData.shift()
        this.setState({realTimeData: newData.concat(data)})
      }
    })
  }

  componentWillUnmount() {
    socket.removeAllListeners('cden')
  }

  render() {
    const {device} = this.props

    return(
      <div className="data-content-container">
        <h2 className="data-content-title">实时视图</h2>
        <div className="data-content">
          {this.renderDataTable(device)}
          {this.renderDataChart(device)}
        </div>
      </div>
    )
  }

  renderDataTable(device) {
    const {chartOption: {dataItemList, unit}} = device
    const {realTimeData} = this.state
    const newestData = realTimeData.slice(-1)[0] || {}

    // 根据指标个数分区
    const span = '' + Math.floor(24 / dataItemList.length)

    return (
      <div className="data-table">
        <h3>数据指标</h3>
        <Row>
          {dataItemList.map(({name}, i) => {
            const dataNum = newestData[name] || '等待...'
            return (
              <Col className="text-center data-col" key={i} span={span}>
                <h4>{name}</h4>
                <div><span className="data">{dataNum}</span>  / {unit}</div>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }

  renderDataChart(device) {
    const {realTimeData} = this.state
    const {realTimeChartType} = this.props
    const hasData = realTimeData.length !== 0

    const kindOfChart = {
      line: {component: <LineChart device={device} data={realTimeData} isRealTime={true}/>, name: '折线图'},
      bar: {component: <BarChart device={device} data={realTimeData} isRealTime={true}/>, name: '柱状图'},
      area: {component: <AreaChart device={device} data={realTimeData} isRealTime={true}/>, name: '区域图'}
    }

    return (
      <div className="data-chart">
        <h3>
          <span>实时数据</span>&emsp;
          <Select id="type" disabled={!hasData} defaultValue="line" style={{ width: 80 }} onSelect={this.changeChartType}>
            {Object.keys(kindOfChart).map((value)=>{
              return <Option key={value} value={value}>{kindOfChart[value].name}</Option>
            })}
          </Select>
        </h3>

        <div className="chart">
          {hasData ?
            kindOfChart[realTimeChartType].component
            : '等待实时数据中...'
          }
        </div>
      </div>
    )
  }
}

RealTimeData.defaultProps = {
  device: {
    data: [],
    chartOption: {
      dataItemList: []
    }
  }
}

export default RealTimeData
