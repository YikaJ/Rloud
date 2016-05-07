/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Icon} from 'antd'

class DeviceList extends Component {
  render() {
    return (
      <div className="device-container">
        <h1 className="title">设备列表</h1>
        <ul className="device-list clearfix">
          <li className="pull-left">
            <Link to="/app/data">
              <h3 className="device-name">温度监控器</h3>
              <div>平均温度: 20</div>
              <div>实时温度: 25</div>
            </Link>
          </li>
          <li className="pull-left">
            <Link to="/app/data">
              <h3 className="device-name">湿度监控器</h3>
              <div>平均温度: 20</div>
              <div>实时温度: 25</div>
            </Link>
          </li>

          <li className="pull-left add-device">
            <Link to="/app/add">
              <h3 className="title">新建你的设备</h3>
              <div className="text-center">
                <Icon type="plus-circle-o"/>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default DeviceList
