/**
 * Created by YikaJ on 16/5/7.
 */

import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import AddDeviceForm from './AddDeviceForm'
import BindDeviceForm from './BindDeviceForm'
import {Steps} from 'antd'
const Step = Steps.Step

import selector from 'selector/addDevice'

class AddDevice extends Component {
  render() {
    const {currentStep} = this.props
    return (
      <div className="add-device-container">
        <div className="step-bar">
          <Steps current={currentStep}>
            <Step title="新建设备"  description="完善设备需要的信息和图表类型"/>
            <Step title="绑定设备"  description="让硬件和软件绑定在一起"/>
          </Steps>
        </div>
        <div className="add-device-content">
          {this.renderContent(currentStep)}
        </div>
      </div>
    )
  }

  renderContent(currentStep) {
    console.log(currentStep)
    switch(currentStep) {
      case 0:
        return <AddDeviceForm />

      case 1:
        return <BindDeviceForm />
    }

  }
}

export default connect(selector)(AddDevice)
