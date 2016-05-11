/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import Header from 'component/Header/Header'
import DeviceNav from 'component/DeviceNav/DeviceNav'
import DeviceData from './DeviceData'

class DeviceDataContainer extends Component {
  render() {
    const {params: {deviceId}} = this.props

    return (
      <div className="data-container">
        <DeviceNav />
        <DeviceData deviceId={deviceId}/>
      </div>
    )
  }
}

export default DeviceDataContainer
