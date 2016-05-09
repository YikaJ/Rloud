/**
 * Created by YikaJ on 16/5/8.
 */

import {
  ADD_DEVICE_SUCCESS,
  GET_DEVICE_SUCCESS
} from 'actionType'

export default function reducer(state={}, action) {
  const {type, payload} = action

  switch(type) {

    case GET_DEVICE_SUCCESS:
      return {
        ...state,
        ...payload.device
      }

    case ADD_DEVICE_SUCCESS:
      return {
        ...state,
        [payload.deviceId]: payload
      }

    default:
      return state
  }
}