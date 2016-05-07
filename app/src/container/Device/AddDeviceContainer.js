/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import {Steps} from 'antd'
const Step = Steps.Step

class AddDevice extends Component {
  render() {
    return (
      <div className="add-device-container">
        <div className="step-bar">
          <Steps current={1}>
            <Step title="新建设备" status="process" description="完善设备需要的信息和图表类型"/>
            <Step title="绑定设备" status="wait" description="让硬件和软件绑定在一起"/>
          </Steps>
        </div>
      </div>
    )
  }
}

export default AddDevice
