/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import { Input, Button, Row, Col, message} from 'antd'
import {browserHistory} from 'react-router'
import autobind from 'myUtil/autobind'
import socket from 'myUtil/socketio'

import {getBindCode} from 'action/device'

class BindDevice extends Component {

  @autobind
  getBindCode() {
    const {dispatch, deviceId} = this.props
    dispatch(getBindCode({deviceId}))
  }

  componentDidMount() {
    // 开启监听
    socket.on('bden', (res) => {
      const {ret, data, msg} = res
      if(ret === 0) {
        message.success('成功绑定,请开始采集数据')
        browserHistory.replace(`/app/data/${data.deviceId}`)
      } else {
        message.error(msg)
      }
    })
  }

  componentWillUnmount() {
    // Todo 关闭监听
    socket.removeAllListeners('bden')
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
            <Button disabled={!!bindCode || !!isLoading} size="large" onClick={this.getBindCode}>
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
