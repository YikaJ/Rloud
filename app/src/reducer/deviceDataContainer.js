/**
 * Created by YikaJ on 16/5/12.
 */

import {
  CHART_DATA_NAV_TO, CHANGE_HISTORY_CHART_TYPE,
  CHANGE_REALTIME_CHART_TYPE, CHANGE_DATA_TYPE
} from 'actionType'

const initialState = {
  navKey: "1",
  historyChartType: 'line',
  realTimeChartType: 'line'
}

export default function reducer(state = initialState, action) {
  const {type, payload} = action

  switch(type) {
    case CHART_DATA_NAV_TO:
    case CHANGE_HISTORY_CHART_TYPE:
    case CHANGE_REALTIME_CHART_TYPE:
    case CHANGE_DATA_TYPE:
      return {
        ...state,
        ...payload
      }
    
    default:
      return state
  }
}