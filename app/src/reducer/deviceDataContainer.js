/**
 * Created by YikaJ on 16/5/12.
 */

import {
  CHART_DATA_NAV_TO
} from 'actionType'

const initialState = {
  navKey: "1"
}

export default function reducer(state = initialState, action) {
  const {type, payload} = action

  switch(type) {
    case CHART_DATA_NAV_TO:
      return {
        ...state,
        ...payload
      }
    
    default:
      return state
  }
}