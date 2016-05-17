/**
 * Created by YikaJ on 16/5/12.
 */

import React, {Component} from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { Link } from 'react-router'

class DeviceNav extends Component {

  render() {
    const {deviceList, deviceId, location: {query}} = this.props
    const currentDevice = deviceList[deviceId] || {}

    return (
      <nav className="clearfix device-data-nav">
        <Dropdown overlay={this.renderMenu()} trigger={['click']}>
          <div className="pull-left dropdown">{currentDevice.name} <Icon type="down"/></div>
        </Dropdown>
        <Link to={`/app/data/${deviceId}`} className="pull-left">
          <Icon type="bar-chart"/> <span className={query.manage ? '' : 'active'}>基础数据</span>
        </Link>
        <Link to={`/app/data/${deviceId}?manage=true`} className="pull-left">
          <Icon type="setting"/> <span className={query.manage ? 'active' : ''}>设备管理</span>
        </Link>
      </nav>
    )
  }

  renderMenu() {
    const {deviceList} = this.props
    return (
      <Menu>
        {
          Object.keys(deviceList)
            .filter((deviceId) => deviceList[deviceId].isBind)
            .map((deviceId) => {
              const device = deviceList[deviceId]
              return (
                <Menu.Item key={deviceId}>
                  <Link to={`/app/data/${deviceId}`}>{device.name}</Link>
                </Menu.Item>
              )
            })
        }
      </Menu>
    )
  }
}
export default DeviceNav