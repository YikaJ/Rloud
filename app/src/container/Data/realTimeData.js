/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import {Row, Col} from 'antd'
import LineChart from 'component/LineChart/LineChart'
import socket from 'myUtil/socketio'

import {updateDeviceData} from 'action/chartData'

class RealTimeData extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    socket.on('cden', ({ret, data}) => {
      if(ret === 0) {
        dispatch(updateDeviceData(data.deviceId, data.data))
      }
    })
  }

  componentWillUnmount() {
    socket.removeAllListener('cden')
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
    const {chartOption: {dataItemList, unit}, data} = device
    const newestData = data.slice(-1)[0] || {}

    // 根据指标个数分区
    const span = '' + Math.floor(24 / dataItemList.length)

    return (
      <div className="data-table">
        <h3>数据指标</h3>
        <Row>
          {dataItemList.map((itemName, i) => {
            const dataNum = newestData[itemName] || '等待...'
            return (
              <Col className="text-center data-col" key={i} span={span}>
                <h4>{itemName}</h4>
                <div><span className="data">{dataNum}</span>  / {unit}</div>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }

  renderDataChart(device) {
    return (
      <div className="data-chart">
        <h3>实时数据</h3>
        <div className="chart">
          <LineChart device={device} isRealTime={true}/>
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
