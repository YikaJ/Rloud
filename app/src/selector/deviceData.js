/**
 * Created by YikaJ on 16/5/12.
 */

import {createSelector} from 'reselect'

const entitiesSelector = state => state.entities
const deviceDataSelector = state => state.deviceDataContainer

const selector = createSelector(
  entitiesSelector, deviceDataSelector,
  ({deviceList}, {navKey, historyChartType, realTimeChartType, dataType}) => {
    return {
      deviceList,
      navKey,
      historyChartType,
      realTimeChartType,
      dataType
    }
  }
)

export default selector