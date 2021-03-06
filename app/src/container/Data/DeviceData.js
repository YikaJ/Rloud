/**
 * Created by YikaJ on 16/5/11.
 */

import React, {Component, PropTypes} from 'react'
import { Menu, Icon, Row, Col } from 'antd';
import { navTo } from 'action/chartData'
import autobind from 'myUtil/autobind'
const {SubMenu} = Menu

import {RealTimeData, HistoryTendency} from './DataContent'
import {PointDataTable, HistoryDataTable} from './DataTable'

class DeviceData extends Component {

  @autobind
  handleSelectKey({key}) {
    const {dispatch} = this.props
    dispatch(navTo(key))
  }

  render() {
    const {deviceId, deviceList} = this.props
    const device = deviceList[deviceId]
    return (
      <Row>
        <Col span="4">
          {this.renderMenu(deviceId)}
        </Col>
        <Col span="20">
          {this.renderContent(device)}
        </Col>
      </Row>
    )
  }

  renderContent(device) {
    switch (this.props.navKey) {
      case '1':
        return <RealTimeData {...this.props} device={device}/>
      case '2':
        return <HistoryTendency {...this.props} device={device}/>
      case '3':
        return <PointDataTable {...this.props} device={device}/>
      case '4':
        return <HistoryDataTable {...this.props} device={device}/>
    }
  }

  renderMenu() {
    return (
      <Menu className="menu pull-left"
            defaultSelectedKeys={[this.props.navKey || '1']}
            defaultOpenKeys={['chart', 'table']}
            onSelect={this.handleSelectKey}
            mode="inline">
        <SubMenu key="chart" title={<span><Icon type="bar-chart" /><span>数据视图</span></span>}>
          <Menu.Item key="1">实时视图</Menu.Item>
          <Menu.Item key="2">历史趋势</Menu.Item>
        </SubMenu>
        <SubMenu key="table" title={<span><Icon type="appstore" /><span>数据表格</span></span>}>
          <Menu.Item key="3">基础数据</Menu.Item>
          <Menu.Item key="4">数据回档</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default DeviceData
