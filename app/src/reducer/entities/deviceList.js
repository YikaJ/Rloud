/**
 * Created by YikaJ on 16/5/8.
 */

import {
  ADD_DEVICE_SUCCESS, GET_DEVICE_SUCCESS,
  UPDATE_DEVICE_DATA, GET_HISTORY_DATA_SUCCESS,
  DEL_DEVICE_SUCCESS, EDIT_DEVICE_SUCCESS,
  UPDATE_ERROR_DATA
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

    case EDIT_DEVICE_SUCCESS:
      return {
        ...state,
        [payload.deviceId]: {
          ...state[payload.deviceId],
          ...payload
        }
      }

    case DEL_DEVICE_SUCCESS: {
      const {deviceId} = payload
      const newDeviceList = {...state}
      delete newDeviceList[deviceId]
      return newDeviceList
    }

    case UPDATE_DEVICE_DATA: {
      const {deviceId, data} = payload

      const targetDevice = state[deviceId]

      if(targetDevice) {
        return {
          ...state,
          [deviceId]: {
            ...targetDevice,
            data: (targetDevice.data).concat(data)
          }
        }
      }

      return state
    }

    case GET_HISTORY_DATA_SUCCESS:
      return {
        ...state,
        [payload.deviceId]: {
          ...state[payload.deviceId],
          ...payload
        }
      }

    case UPDATE_ERROR_DATA:
      return {
        ...state,
        [payload.deviceId]: {
          ...state[payload.deviceId],
          errorData: [...(payload.deviceId.errorData || []), errorData]
        }
      }

    default:
      return state
  }
}