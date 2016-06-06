/**
 * Created by YikaJ on 16/5/7.
 */
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Header from 'component/Header/Header'

import {getUser} from 'action/user'
import {getDevice, editDevice, updateErrorData} from 'action/device'

// 开启 socket.io 连接
import socket from 'myUtil/socketio'

class App extends Component {

  componentDidMount() {
    const {dispatch, deviceList} = this.props
    dispatch(getUser())
    dispatch(getDevice())

    if(Notification.permission !== 'grant') {
      Notification.requestPermission()
    }

    socket.on('connect', () => console.log('已连接到 WebSocket!'))
    socket.on('data_warning', ({ret, data: {device, msg, errorData}})=>{
      if(ret === 0) {
        new Notification(`${device.name}:数据异常报警`, {
          body: msg
        })

        dispatch(updateErrorData(device._id, errorData))
      }
    })
  }

  render() {
    const {children, me} = this.props
    return (
      <div className="app">
        <Header me={me}/>
        {children}
      </div>
    )
  }
}

export default connect((state)=>{
  return {
    me: state.entities.me,
    deviceList: state.entities.deviceList
  }
})(App)
