
import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ViewerReducer from 'reducers/ViewerReducer'
import RoomsReducer from 'reducers/RoomsReducer'
import UsersReducer from 'reducers/UsersReducer'
import MessagesReducer from 'reducers/MessagesReducer'

export default combineReducers({
  viewer: ViewerReducer,
  rooms: RoomsReducer,
  users: UsersReducer,
  messages: MessagesReducer,
  routing: routerReducer,
})