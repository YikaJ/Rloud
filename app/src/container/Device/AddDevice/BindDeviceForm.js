/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import { Input, Button, Row, Col} from 'antd'
import autobind from 'util/autobind'

import {getBindCode} from 'action/device'

class BindDevice extends Component {

  @autobind
  getBindCode() {
    const {dispatch, deviceId} = this.props
    dispatch(getBindCode({deviceId}))
  }

  componentDidMount() {
    // Todo 开启监听
  }

  componentWillUnmount() {
    // Todo 关闭监听
  }

  render() {
    const {bindCode, isLoading} = this.props
    return (
      <div>
        <Row>
          <Col span="6" offset="6">
            <Input size="large" value={bindCode} readOnly/>
          </Col>
          <Col span="6" offset="1">
            <Button disabled={bindCode || isLoading} size="large" onClick={this.getBindCode}>
              {isLoading ? '正在获取中...' :
               bindCode ? '已获绑定码' : '获取绑定码'
              }
            </Button>
          </Col>
        </Row>
        <div className="intro">
          <h2 className="text-center title">使用指南</h2>
          <ol>
            <li>插入传感器,并打开树莓派</li>
            <li>使用脚本,并在提示输入绑定码时,输入该绑定码</li>
          </ol>
        </div>
      </div>
    )
  }
}

export default BindDevice
