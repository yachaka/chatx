
const DataLoader = require('dataloader')

const Room = require('./db/models/Room')
const User = require('./db/models/User')
const Message = require('./db/models/Message')

module.exports = {
  roomById: new DataLoader(keys => Room.getByIds(keys)),
  userById: new DataLoader(keys => User.getByIds(keys)),
  messageById: new DataLoader(keys => Message.getByIds(keys)),
}