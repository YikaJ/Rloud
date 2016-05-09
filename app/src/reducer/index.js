/**
 * Created by YikaJ on 16/5/6.
 */
import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import entities from './entities'
import addDeviceContainer from './addDeviceContainer'

const rootReducer = combineReducers({
  routing: routerReducer,
  entities,
  addDeviceContainer
})

export default rootReducer

