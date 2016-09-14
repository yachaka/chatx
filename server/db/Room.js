
const identity = require('identity-function')
const r = require('../r')

const Model = require('./Model')

class Room extends Model {
  constructor() {
    super('rooms')
  }

  create(name, admin) {
    return super.create({
      name,
      users: [],
      messages: [],
    })
  }

  addMessagesToRoom(id, messages) {
    return this.table
      .get(id)
      .update(row => ({
        messages: row('messages').add(messages)
      }))
      .run()
      .then(identity)
  }

  joinRoom(id, user) {
    return this.table
      .get(id)
      .update(row => ({
        users: row('users').add([user])
      }))
      .run()
      .then(identity)
  }

  leaveRoom(id, user) {
    return this.table
      .get(id)
      .update(row => {
        let users = row('users')
        return {
          users: r.branch(
            users.offsetsOf( user ).count().ne( 0 ),
            users.deleteAt( users.offsetsOf( user ).nth( 0 ) ),
            users
          )
        }
      })
      .run()
      .then(console.log)
      .catch(console.log)
  }
}

module.exports = new Room()