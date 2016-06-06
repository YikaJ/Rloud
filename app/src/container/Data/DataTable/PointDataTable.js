/**
 * Created by YikaJ on 16/6/1.
 */
import { Table } from 'antd'
import React, {Component} from 'react'
import autobind from 'myUtil/autobind'

class PointDataTable extends Component {

  render() {
    return (
      <div className="data-content-container">
        <h2 className="data-content-title">异常数据</h2>
        <div className="data-content table">
          {this.renderTable()}
        </div>
      </div>
    )
  }

  renderTable() {
    const {device} = this.props

    const columns = [{
      title: '时间',
      dataIndex: 'time'
    }, {
      title: '描述',
      dataIndex: 'yAxisName'
    }, {
      title: '数据项',
      dataIndex: 'name'
    }, {
      title: '异常值',
      dataIndex: 'data'
    }];

    const data = device.errorData.map((data, index) => {
      return {
        ...data,
        key: index,
        data: data.data + device.chartOption.unit,
        yAxisName: device.chartOption.yAxisName
      }
    }).reverse()

    return (
      device ?
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 8}}/> : ''
    )
  }
}

export default PointDataTable
