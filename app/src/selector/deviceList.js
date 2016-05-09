/**
 * Created by YikaJ on 16/5/8.
 */

import {createSelector} from 'reselect'

const entitiesSelector = state => state.entities

const selector = createSelector(
  entitiesSelector,
  ({me, deviceList}) => {
    return {
      me, deviceList
    }
  }
)

export default selector