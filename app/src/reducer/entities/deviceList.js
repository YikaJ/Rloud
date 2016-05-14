/**
 * Created by YikaJ on 16/5/8.
 */

import {
  ADD_DEVICE_SUCCESS, GET_DEVICE_SUCCESS,
  UPDATE_DEVICE_DATA
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
    
    case UPDATE_DEVICE_DATA: {
      const {deviceId, data} = payload

      const targetDevice = state[deviceId]

      if(targetDevice) {
        return {
          ...state,
          [deviceId]: {
            ...targetDevice,
            data: (targetDevice.data || []).concat(data)
          }
        }
      }

      return state
    }

    default:
      return state
  }
}