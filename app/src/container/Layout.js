/**
 * Created by YikaJ on 16/5/7.
 */
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Header from 'component/Header/Header'

import {getUser} from 'action/user'
import {getDevice} from 'action/device'

// 开启 socket.io 连接
import socket from 'myUtil/socketio'

class App extends Component {

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(getUser())
    dispatch(getDevice())

    socket.on('connect', () => console.log('已连接到 WebSocket!'))
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
  return {me: state.entities.me}
})(App)
