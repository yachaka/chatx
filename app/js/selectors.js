
import { createSelector } from 'reselect'

import querySchema from 'lib/querySchema'
import * as schema from 'schema'

export const selectViewer = (state) => state.viewer

export const selectRooms = (state) => state.rooms
export const selectRoomsArray = (state) => state.rooms && Object.keys(state.rooms).map(k => state.rooms[k]) || null
export const selectUsers = (state) => state.users
export const selectUsersArray = (state) => state.users && Object.keys(state.users).map(k => state.users[k]) || null
export const selectMessages = (state) => state.messages
export const selectMessagesArray = (state) => state.messages && Object.keys(state.messages).map(k => state.messages[k]) || null
export const selectEntities = createSelector(
  selectRooms,
  selectUsers,
  selectMessages,
  (rooms, users, messages) => ({ rooms, users, messages }),
)

export const selectRoomAndQuery = (propName) => createSelector(
  (state, props) => {
    let rooms = selectRooms(state, props)
    return rooms && rooms[props[propName]] || null
  },
  selectEntities,
  (room, entities) => room && querySchema(room, entities, schema.Room)
)