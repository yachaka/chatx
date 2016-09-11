
import { handleActions } from 'redux-actions'

import createIDMapperReducer from './IDMapperReducer'
import {
  RECEIVED_ROOMS,
  DELETED_ROOMS,
} from 'actions/RoomsActions'

const initialState = null

export default createIDMapperReducer({
  INSERT: RECEIVED_ROOMS,
  DELETE: DELETED_ROOMS,
}, initialState)