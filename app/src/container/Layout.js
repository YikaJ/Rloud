/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import Header from 'component/Header/Header'
import DeviceNav from 'component/DeviceNav/DeviceNav'

class App extends Component {
  render() {
    const {children} = this.props
    return (
      <div className="app">
        <Header />
        {children}
      </div>
    )
  }
}

export default App
