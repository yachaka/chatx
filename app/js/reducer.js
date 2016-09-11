
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import roomsReducer from 'reducers/RoomsReducer'

export default combineReducers({
  rooms: roomsReducer,
  routing: routerReducer,
})