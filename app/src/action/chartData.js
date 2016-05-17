/**
 * Created by YikaJ on 16/5/12.
 */

import {
  CHART_DATA_NAV_TO, UPDATE_DEVICE_DATA, 
  CHANGE_HISTORY_CHART_TYPE, CHANGE_REALTIME_CHART_TYPE, CHANGE_DATA_TYPE,
  GET_HISTORY_DATA_REQUEST, GET_HISTORY_DATA_SUCCESS, GET_HISTORY_DATA_FAILURE
} from 'actionType'

import {CALL_API} from '../middleware/api'

export function navTo(navKey) {
  return {
    type: CHART_DATA_NAV_TO,
    payload: {navKey}
  }
}

export function updateDeviceData(deviceId, data) {
  return {
    type: UPDATE_DEVICE_DATA,
    payload: {deviceId, data}
  }
}


export function changeRealTimeChartType(chartType) {
  return {
    type: CHANGE_REALTIME_CHART_TYPE,
    payload: {realTimeChartType: chartType}
  }
}

export function changeHistoryChartType(chartType) {
  return {
    type: CHANGE_HISTORY_CHART_TYPE,
    payload: {historyChartType: chartType}
  }
}

export function changeDataType(dataType) {
  return {
    type: CHANGE_DATA_TYPE,
    payload: {dataType}
  }
}

export function getHistoryData(deviceId) {
  return {
    [CALL_API]: {
      types: [GET_HISTORY_DATA_REQUEST, GET_HISTORY_DATA_SUCCESS, GET_HISTORY_DATA_FAILURE],
      request: '/api/getHistoryData',
      method: 'POST',
      payload: {
        deviceId
      }
    }
  }
}
