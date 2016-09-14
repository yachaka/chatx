
import { handleActions } from 'redux-actions'

import {
  UPDATE_VIEWER,
} from 'actions'

const initialState = null

const reducers = {
  [UPDATE_VIEWER]: (state, { payload: viewer }) => viewer || null
}

export default handleActions(reducers, initialState)
