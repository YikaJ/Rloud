/**
 * Created by YikaJ on 16/5/7.
 */
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Header from 'component/Header/Header'
import DeviceNav from 'component/DeviceNav/DeviceNav'

import {getUser} from 'action/user'
import {getDevice} from 'action/device'

// 开启 socket.io 连接
const socket = require('socket.io-client')('http://localhost:3333');

class App extends Component {

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(getUser())
    dispatch(getDevice())

    socket.on('connect', () => {
      console.log('connect to ws')
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
  return {me: state.entities.me}
})(App)
