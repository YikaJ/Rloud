/**
 * Created by YikaJ on 16/5/9.
 */

import {
  ADD_DEVICE_SUCCESS,
  POST_BIND_CODE_SUCCESS, POST_BIND_CODE_REQUEST,
  CLEAR_DEVICE_FORM, START_TO_BIND_DEVICE
} from 'actionType'

const initialState = {
  currentStep: 0,
  isLoading: false
}

export default function reducer(state = initialState, action) {
  const {type, payload} = action

  switch (type) {

    case ADD_DEVICE_SUCCESS:
      return {
        ...state,
        currentStep: 1,
        deviceId: payload.deviceId
      }

    case POST_BIND_CODE_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case POST_BIND_CODE_SUCCESS:
      return {
        ...state,
        bindCode: payload.bindCode,
        isLoading: false
      }

    case CLEAR_DEVICE_FORM:
      return initialState

    case START_TO_BIND_DEVICE:
      return {
        ...state,
        ...payload,
        currentStep: 1
      }

    default:
      return state
  }
}
