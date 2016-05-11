/**
 * Created by YikaJ on 16/5/11.
 */

import React, {Component, PropTypes} from 'react'
import Header from 'component/Header/Header'
import DeviceNav from 'component/DeviceNav/DeviceNav'

class DeviceData extends Component {
  render() {
    const {deviceId} = this.props
    return (
      <div className="data-container">
        <DeviceNav />
        <h1>DeviceData</h1>
        <h3>{deviceId}</h3>
      </div>
    )
  }
}

export default DeviceData
