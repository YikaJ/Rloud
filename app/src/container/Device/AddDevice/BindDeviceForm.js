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
            <li>让硬件设备通过 Socket 以下面的格式进行绑定传输。</li>
            <li>通过该格式进行传输可以得到正确解析,并绑定设备。
              <pre className="code-block">{`
// JSON数据格式,地址是: http://localhost:3334
{
  "type": "bden",
  "user": {
    "email": "xxx@xxx.com",
    "password": "xxxxxx"
  },
  "device": {
    "bindCode": "xxxxxx"
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
