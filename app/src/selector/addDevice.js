/**
 * Created by YikaJ on 16/5/8.
 */

import {createSelector} from 'reselect'

const addDeviceContainerSelector = state => state.addDeviceContainer
const entitiesSelector = state => state.entities

const selector = createSelector(
  addDeviceContainerSelector, entitiesSelector,
  ({currentStep, bindCode, deviceId}, {me}) => {
    return {
      currentStep, bindCode, deviceId, me
    }
  }
)

export default selector