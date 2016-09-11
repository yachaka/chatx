
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import globalReducer from 'reducers/GlobalReducer'
import roomsReducer from 'reducers/RoomsReducer'

export default combineReducers({
  global: globalReducer,
  rooms: roomsReducer,
  routing: routerReducer,
})