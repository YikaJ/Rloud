/**
 * Created by YikaJ on 16/5/7.
 */

import React from 'react'
import {syncHistoryWithStore} from 'react-router-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Layout from './container/Layout'
import DeviceDataContainer from './container/Data/DeviceDataContainer'
import DeviceData from './container/Data/DeviceData'

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

        <Route path="data/:deviceId" component={DeviceDataContainer} />

      </Route>
    </Router>
  )
}

