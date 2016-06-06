/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import { Input, Button, Row, Col, message} from 'antd'
import {browserHistory} from 'react-router'
import autobind from 'myUtil/autobind'
import socket from 'myUtil/socketio'
import {editDevice} from 'action/device'

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
      const {dispatch, deviceId} = this.props
      if(ret === 0) {
        dispatch(editDevice({
          isBind: true,
          deviceId
        }), '成功绑定,请开始采集数据')
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
    const {bindCode, isLoading, me, deviceId} = this.props
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
            <li>让硬件设备通过 Socket 以下面的格式进行绑定传输。</li>
            <li>通过该格式进行传输可以得到正确解析,并绑定设备。
              <pre className="code-block">{`
// JSON数据格式,地址是: http://localhost:3334
{
  "secret": "Rloud d-server"
  "type": "bden",
  "userId": "${me._id}",
  "bindCode": "${bindCode||'xxxxx'}",
  "deviceId": "${deviceId}"
}
`}
              </pre>
            </li>
            <li>绑定完成后,数据通过以下格式传输数据
              <pre className="code-block">{`
// JSON数据格式,地址是: http://localhost:3334
{
  "secret": "Rloud d-server"
  "type": "cden",
  "userId": "${me._id}",
  "deviceId": "${deviceId}",
  "data": {
    "_time": Date,
    "室内": data,
    "室外": data,
    "A实验室": data
  }
}
`}
              </pre>
            </li>
          </ol>
        </div>
      </div>
    )
  }
}

export default BindDevice
