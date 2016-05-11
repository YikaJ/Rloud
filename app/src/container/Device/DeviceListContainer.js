/**
 * Created by YikaJ on 16/5/7.
 */
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import selector from 'selector/deviceList'
import {Link} from 'react-router'
import {Icon} from 'antd'

class DeviceList extends Component {

  render() {
    const {deviceList} = this.props

    return (
      <div className="device-container">
        <h1 className="title">设备列表</h1>
        <ul className="device-list clearfix">
          {Object.keys(deviceList).map((deviceId)=>{
            const {name, desc, isBind} = deviceList[deviceId]
            return isBind ?
              this.renderDeviceItem({name, desc, deviceId}) :
              this.renderBindItem({name, deviceId})
          })}

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

  renderDeviceItem({name, desc, deviceId}) {
    return (
      <li className="pull-left" key={deviceId}>
        <Link to="/app/data">
          <h3 className="device-name">{name}</h3>
          <div>{desc}</div>
          <div>昨日平均值: 25</div>
        </Link>
      </li>
    )
  }

  renderBindItem({name, deviceId}) {
    return (
      <li className="pull-left" key={deviceId}>
        <Link to="/app/data">
          <h3 className="device-name">{name}</h3>
          <h5>need to bind!</h5>
        </Link>
      </li>
    )
  }
}

export default connect(selector)(DeviceList)
