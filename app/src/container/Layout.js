/**
 * Created by YikaJ on 16/5/7.
 */
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Header from 'component/Header/Header'
import DeviceNav from 'component/DeviceNav/DeviceNav'

import {getUser} from 'action/user'
import {getDevice} from 'action/device'

class App extends Component {

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(getUser())
    dispatch(getDevice())
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
