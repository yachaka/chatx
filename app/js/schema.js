
import { Schema, arrayOf } from 'normalizr'

export const User = new Schema('users')

export const Message = new Schema('messages')
Message.define({
  user: User,
})

export const Room = new Schema('rooms')
Room.define({
  users: arrayOf(User),
  messages: arrayOf(Message),
})