/**
 * Created by YikaJ on 16/5/7.
 */

import React from 'react'
import {syncHistoryWithStore} from 'react-router-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Layout from './container/Layout'
import Data from './container/Data/DataContainer'
import DeviceList from './container/Device/DeviceListContainer'
import AddDeviceContainer from './container/Device/AddDevice/AddDeviceContainer'
import BindDevice from './container/Device/AddDevice/BindDeviceForm'
import AddDevice from './container/Device/AddDevice/AddDeviceForm'

export default function route(store) {
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Router history={history}>
      <Route path="app" component={Layout}>
        <IndexRedirect to="/app/device" />

        <Route path="device" component={DeviceList} />

        <Route path="add" component={AddDeviceContainer} />

        <Route path="data" component={Data} />

      </Route>
    </Router>
  )
}

