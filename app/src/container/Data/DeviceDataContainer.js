/**
 * Created by YikaJ on 16/5/7.
 */
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import DeviceNav from './DeviceNav'
import DeviceData from './DeviceData'
import selector from 'selector/deviceData'
import {getHistoryData} from 'action/chartData'
import EditDevice from './EditDevice'

class DeviceDataContainer extends Component {

  render() {
    const {params: {deviceId}, location: {query}, deviceList, dispatch} = this.props
    const device = deviceList[deviceId]
    return (
      <div className="device-data-container">
        <DeviceNav {...this.props} deviceId={deviceId}/>
        {query.manage ?
          <EditDevice device={device} dispatch={dispatch}/> :
          <DeviceData {...this.props} deviceId={deviceId} />
        }
      </div>
    )
  }
}

export default connect(selector)(DeviceDataContainer)
