/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import { Input, Button, Row, Col} from 'antd'

class BindDevice extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span="6" offset="6"><Input size="large" readOnly disabled/></Col>
          <Col span="6" offset="1"><Button size="large">获取绑定码</Button></Col>
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
