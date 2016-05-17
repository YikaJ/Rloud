/**
 * Created by YikaJ on 16/5/12.
 */

import {
  CHART_DATA_NAV_TO, CHANGE_CHART_TYPE
} from 'actionType'

const initialState = {
  navKey: "1",
  chartType: 'line'
}

export default function reducer(state = initialState, action) {
  const {type, payload} = action

  switch(type) {
    case CHART_DATA_NAV_TO:
      return {
        ...state,
        navKey: payload.navKey
      }

    case CHANGE_CHART_TYPE:
      return {
        ...state,
        chartType: payload.chartType
      }
    
    default:
      return state
  }
}