/**
 * Created by YikaJ on 16/5/8.
 */

import {CALL_API} from '../middleware/api'
import {
  ADD_DEVICE_REQUEST, ADD_DEVICE_SUCCESS, ADD_DEVICE_FAILURE,
  GET_DEVICE_REQUEST, GET_DEVICE_SUCCESS, GET_DEVICE_FAILURE,
  POST_BIND_CODE_REQUEST, POST_BIND_CODE_SUCCESS, POST_BIND_CODE_FAILURE,
  CLEAR_DEVICE_FORM, START_TO_BIND_DEVICE, UPDATE_ERROR_DATA,
  DEL_DEVICE_REQUEST, DEL_DEVICE_SUCCESS, DEL_DEVICE_FAILURE,
  EDIT_DEVICE_REQUEST,  EDIT_DEVICE_SUCCESS, EDIT_DEVICE_FAILURE
} from 'actionType'
import {message} from 'antd'

// 获取设备列表
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

// 注册绑定设备
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

export function editDevice(payload, msg) {
  return {
    [CALL_API]: {
      types: [EDIT_DEVICE_REQUEST,  EDIT_DEVICE_SUCCESS, EDIT_DEVICE_FAILURE],
      request: '/api/editDevice',
      method: 'POST',
      payload: {
        ...payload
      },
      success: ()=>{
        msg && message.success(msg)
      }
    }
  }
}

export function delDevice(deviceId) {
  return {
    [CALL_API]: {
      types: [DEL_DEVICE_REQUEST, DEL_DEVICE_SUCCESS, DEL_DEVICE_FAILURE],
      request: '/api/delDevice',
      method: 'POST',
      payload: {
        deviceId
      },
      success: function() {
        message.success('删除设备成功')
      },
      error: function() {
        message.error('删除设备失败,请稍后重试')
      }
    }
  }
}

// 获取绑定码
export function getBindCode(payload) {
  return {
    [CALL_API]: {
      types: [POST_BIND_CODE_REQUEST, POST_BIND_CODE_SUCCESS, POST_BIND_CODE_FAILURE],
      request: '/api/getBindCode',
      method: 'POST',
      payload: {
        ...payload
      }
    }
  }
}

// 清空表单
export function clearDeviceForm() {
  return {
    type: CLEAR_DEVICE_FORM
  }
}

// 前往绑定页面
export function startToBind(deviceId) {
  return {
    type: START_TO_BIND_DEVICE,
    payload: {
      deviceId
    }
  }
}

export function updateErrorData(deviceId, errorData) {
  return {
    type: UPDATE_ERROR_DATA,
    payload: {
      deviceId, errorData
    }
  }
}