/**
 * Created by YikaJ on 16/5/6.
 */
import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer
})

export default rootReducer

