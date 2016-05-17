/**
 * Created by YikaJ on 16/5/11.
 */

import React, {Component, PropTypes} from 'react'
import { Menu, Icon, Row, Col } from 'antd';
import { navTo } from 'action/chartData'
import autobind from 'myUtil/autobind'
const {SubMenu} = Menu

import {RealTimeData, HistoryTendency} from './DataContent'

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
    }
  }

  renderMenu() {
    return (
      <Menu className="menu pull-left"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['chart', 'table']}
            onSelect={this.handleSelectKey}
            mode="inline">
        <SubMenu key="chart" title={<span><Icon type="mail" /><span>数据视图</span></span>}>
          <Menu.Item key="1">实时视图</Menu.Item>
          <Menu.Item key="2">历史趋势</Menu.Item>
        </SubMenu>
        <SubMenu key="table" title={<span><Icon type="appstore" /><span>数据表格</span></span>}>
          <Menu.Item key="5">基础数据</Menu.Item>
          <Menu.Item key="6">数据回档</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title="三级导航">
          <Menu.Item key="7">选项7</Menu.Item>
          <Menu.Item key="8">选项8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三</span></span>}>
          <Menu.Item key="9">选项9</Menu.Item>
          <Menu.Item key="10">选项10</Menu.Item>
          <Menu.Item key="11">选项11</Menu.Item>
          <Menu.Item key="12">选项12</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default DeviceData
