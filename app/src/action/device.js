/**
 * Created by YikaJ on 16/5/8.
 */

import {CALL_API} from '../middleware/api'
import {
  ADD_DEVICE_REQUEST, ADD_DEVICE_SUCCESS, ADD_DEVICE_FAILURE,
  GET_DEVICE_REQUEST, GET_DEVICE_SUCCESS, GET_DEVICE_FAILURE
} from 'actionType'

export function getDevice(payload) {
  return {
    [CALL_API]: {
      types: [GET_DEVICE_REQUEST, GET_DEVICE_SUCCESS, GET_DEVICE_FAILURE],
      request: '/api/getDevice',
      payload: {
        ...payload
      }
    }
  }
}

export function registerDevice(payload) {
  return {
    [CALL_API]: {
      types: [ADD_DEVICE_REQUEST, ADD_DEVICE_SUCCESS, ADD_DEVICE_FAILURE],
      request: '/api/createDevice',
      method: 'POST',
      payload: {
        ...payload
      }
    }
  }
}