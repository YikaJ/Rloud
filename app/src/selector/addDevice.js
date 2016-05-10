/**
 * Created by YikaJ on 16/5/8.
 */

import {createSelector} from 'reselect'

const addDeviceContainerSelector = state => state.addDeviceContainer

const selector = createSelector(
  addDeviceContainerSelector,
  ({currentStep, bindCode, deviceId}) => {
    return {
      currentStep, bindCode, deviceId
    }
  }
)

export default selector