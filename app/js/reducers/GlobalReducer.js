
import { handleActions } from 'redux-actions'

import {
  RECEIVED_VIEWER_DATA,
} from 'actions/GlobalActions'

const initialState = {
  viewer: null,
}

const reducers = {
  [RECEIVED_VIEWER_DATA]: (state, { payload: viewer }) => ({
    ...state,
    viewer,
  })
}

export default handleActions(reducers, initialState)
