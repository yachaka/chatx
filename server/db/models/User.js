
const Model = require('./Model')

const User = new Model()

User.create({
  username: 'John Doe',
  password: '123456',
})

module.exports = User
