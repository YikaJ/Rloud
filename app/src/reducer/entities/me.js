/**
 * Created by YikaJ on 16/5/8.
 */

import {
  GET_USER_SUCCESS
} from 'actionType'

export default function reducer(state={}, action) {
  const {type, payload} = action

  switch(type) {
    case GET_USER_SUCCESS:
      return {...payload.user}

    default:
      return state
  }
}