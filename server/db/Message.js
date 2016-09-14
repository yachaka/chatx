
const Model = require('./Model')

class Message extends Model {
  constructor() {
    super('messages')
  }

  create(body, user) {
    return super.create({
      body,
      user,
      date: new Date()
    })
  }
}

module.exports = new Message()