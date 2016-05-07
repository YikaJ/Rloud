/**
 * Created by YikaJ on 16/5/7.
 */

import React from 'react'
import {syncHistoryWithStore} from 'react-router-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Layout from './container/Layout'
import Data from './container/Data/DataContainer'
import DeviceList from './container/Device/DeviceListContainer'
import AddDevice from './container/Device/AddDeviceContainer'

export default function route(store) {
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Router history={history}>
      <Route path="app" component={Layout}>
        <IndexRedirect to="/app/device" />
        <Route path="device" component={DeviceList} />
        <Route path="device/add" component={AddDevice}/>
        <Route path="data" component={Data} />
      </Route>
    </Router>
  )
}

