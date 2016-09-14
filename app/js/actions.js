
import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'

/*
 * User-related stories
 */
export const UPDATE_VIEWER = 'UPDATE_VIEWER'
export const updateViewer = createAction(UPDATE_VIEWER)
export const storyLogin = (credentials) => (dispatch, getState, { io }) => {
  return io.emit('login', credentials)
    .then(user => {
      dispatch(updateViewer(user))
      dispatch(push('/'))
      return user
    })
}
export const storyLogout = () => (dispatch, getState, { io }) => {
  return io.emit('logout')
    .then(() => dispatch(updateViewer(null)))
}
export const storyRegister = (data) => (dispatch, getState, { io }) => {
  return io.emit('register', data)
    .then(() => dispatch(storyLogin(data)))
}
export const storyUserTyping = (typing) => (dispatch, getState, { io }) => {
  return io.emit('typing', typing)
}

/*
 * RethinkDB changes stories
 */
export const UPDATE_ROOMS = 'UPDATE_ROOMS'
export const updateRooms = createAction(UPDATE_ROOMS)
export const storyCreateRoom = (roomName) => (dispatch, getState, { io }) => {
  return io.emit('createRoom', roomName)
}

export const UPDATE_USERS = 'UPDATE_USERS'
export const updateUsers = createAction(UPDATE_USERS)

export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
export const updateMessages = createAction(UPDATE_MESSAGES)
export const storyReply = (body, roomId) => (dispatch, getState, { io }) => {
  return io.emit('reply', { body, roomId })
}