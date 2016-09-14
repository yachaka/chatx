
const Model = require('./Model')

class User extends Model {
  constructor() {
    super('users')
  }

  create(avatar, username, password) {
    return super.create({
      avatar,
      username,
      password,
    })
  }

  setTyping(typing, user) {
    return this.table
      .get(user)
      .update({
        typing,
      })
      .run()
      .then(console.log)
  }
}

module.exports = new User()