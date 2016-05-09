/**
 * Created by YikaJ on 16/5/6.
 */

import {
  GET_USER_REQUEST ,GET_USER_SUCCESS, GET_USER_FAILURE
} from 'actionType'
import {CALL_API} from '../middleware/api'

export function getUser(payload) {
  return {
    [CALL_API]: {
      types: [GET_USER_REQUEST ,GET_USER_SUCCESS, GET_USER_FAILURE],
      request: '/api/getUser',
      payload: {
        ...payload
      }
    }
  }
}