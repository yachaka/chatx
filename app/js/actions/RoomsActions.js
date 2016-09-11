
import { createAction } from 'redux-actions'

export const RECEIVED_ROOMS = 'RECEIVED_ROOMS'
export const receivedRooms = createAction(RECEIVED_ROOMS)
export const storyCreateRoom = (name) => (dispatch, getState, { makeGraphQLRequest }) => {
  return makeGraphQLRequest(`
  mutation createRoom($name: String!) {
    createRoom(name: $name) {
      id,
      name,
      messages {
        id,
        body,
        user {
          username
        }
      }
      users {
        id,
        username,
      }
    }
  }
  `, { name })
    .then(data => {
      dispatch(receivedRooms([data.createRoom]))
      return data.createRoom
    })
}
export const storyHydrateAllRooms = () => (dispatch, getState, { makeGraphQLRequest }) => {
  return makeGraphQLRequest(`
  {
    rooms {
      id,
      name,
      messages {
        id,
        body,
        user {
          username
        }
      }
      users {
        id,
        username,
      }
    }
  }
  `)
    .then(data => {
      dispatch(receivedRooms(data.rooms))
      return data.rooms
    })
}
export const storyHydrateRoomById = (id) => (dispatch, getState, { makeGraphQLRequest }) => {

  return makeGraphQLRequest(
  `
  query getRoom($id: ID!) {
    room(id: $id) {
      id,
      name,
      users {
        id,
        username
      },
      messages {
        id,
        body,
        user {
          username
        }
      }
    }
  }
  `, { id })
    .then(data => {
      dispatch(receivedRooms([data.room]))
      return data.room
    })
}

export const storySendMessageAndHydrateRoom = (roomID, body) => (dispatch, getState, { makeGraphQLRequest }) => {
  return makeGraphQLRequest(
  `
  mutation reply($roomID: ID!, $body: String!) {
    sendMessage(roomID: $roomID, body: $body) {
      id,
      messages {
        body,
        user {
          username
        }
      }
    }
  }
  `, { roomID, body })
    .then(data => {
      dispatch(receivedRooms([data.sendMessage]))
      return data.sendMessage
    })
}

export const DELETED_ROOMS = 'DELETED_ROOMS'
export const deletedRooms = createAction(DELETED_ROOMS)