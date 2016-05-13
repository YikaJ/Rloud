/**
 * Created by YikaJ on 16/5/12.
 */

import {
  CHART_DATA_NAV_TO, UPDATE_DEVICE_DATA
} from 'actionType'

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