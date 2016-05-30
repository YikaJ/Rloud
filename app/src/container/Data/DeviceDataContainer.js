/**
 * Created by YikaJ on 16/5/7.
 */
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import DeviceNav from './DeviceNav'
import DeviceData from './DeviceData'
import selector from 'selector/deviceData'
import {getHistoryData} from 'action/chartData'

class DeviceDataContainer extends Component {

  render() {
    const {params: {deviceId}, location: {query}} = this.props
    return (
      <div className="device-data-container">
        <DeviceNav {...this.props} deviceId={deviceId}/>
        {query.manage ?
          '设备配置' :
          <DeviceData {...this.props} deviceId={deviceId} />
        }
      </div>
    )
  }
}

export default connect(selector)(DeviceDataContainer)
