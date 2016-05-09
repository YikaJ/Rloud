/**
 * Created by YikaJ on 16/5/9.
 */

import {
  ADD_DEVICE_SUCCESS
} from 'actionType'

export default function reducer(state = {currentStep: 0}, action) {
  const {type, payload} = action

  switch (type) {

    case ADD_DEVICE_SUCCESS:
      return {
        ...state,
        currentStep: 1
      }

    default:
      return state
  }
}
