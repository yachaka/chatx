
import { createAction } from 'redux-actions'

export const RECEIVED_ROOMS = 'RECEIVED_ROOMS'
export const receivedRooms = createAction(RECEIVED_ROOMS)
export const storyHydrateAllRooms = () => (dispatch, getState, { api }) => {
  return api.rooms.getAll()
    .then((rooms) => {
      dispatch(receivedRooms(rooms))
      return rooms
    })
}
export const storyHydrateRoomById = (id) => (dispatch, getState, { api }) => {
  return api.rooms.getById(id)
    .then(room => {
      dispatch(receivedRooms([room]))
      return room
    })
}

export const DELETED_ROOMS = 'DELETED_ROOMS'
export const deletedRooms = createAction(DELETED_ROOMS)