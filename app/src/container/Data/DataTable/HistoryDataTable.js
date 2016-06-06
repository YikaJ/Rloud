/**
 * Created by YikaJ on 16/6/1.
 */
import { Table } from 'antd'
import React, {Component} from 'react'
import autobind from 'myUtil/autobind'
import {getHistoryData} from 'action/chartData'

const data = []

class HistoryDataTable extends Component {

  componentDidMount() {
    const {dispatch, deviceId} = this.props
    dispatch(getHistoryData(deviceId))
  }

  render() {
    return (
        <div className="data-content-container">
          <h2 className="data-content-title">数据回档</h2>
          <div className="data-content table">
            {this.renderTable()}
          </div>
        </div>
      )
  }

  renderTable() {
    const {device} = this.props

    const columns = device.chartOption.dataItemList.map((dataItem, index) => {
      return {
        title: dataItem.name + `/${device.chartOption.unit}`,
        dataIndex: dataItem.name
      }
    })

    columns.unshift({
      title: '日期',
      dataIndex: 'xAxisName'
    })

    const data = device._30Average && device._30Average.map((data, index)=>{
      return {
        ...data,
        key: index
      }
    }).reverse()

    return (
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 8}} />
    )
  }
}

export default HistoryDataTable
