/**
 * Created by YikaJ on 16/5/8.
 */
import { combineReducers } from 'redux'

import deviceList from './deviceList'
import me from './me'

export default combineReducers({
  deviceList, me
})