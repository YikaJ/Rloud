/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import {Steps} from 'antd'
const Step = Steps.Step

import AddDeviceForm from './AddDeviceForm'

class AddDevice extends Component {
  render() {
    const {children} = this.props
    return (
      <div className="add-device-container">
        <div className="step-bar">
          <Steps current={1}>
            <Step title="新建设备" status="process" description="完善设备需要的信息和图表类型"/>
            <Step title="绑定设备" status="wait" description="让硬件和软件绑定在一起"/>
          </Steps>
        </div>
        <div className="add-device-content">
          {children}
        </div>
      </div>
    )
  }
}

export default AddDevice
