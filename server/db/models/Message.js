
const Model = require('./Model')

const Message = new Model()

Message.create({
    body: 'Hello there !',
    userId: 1,
})

module.exports = Message
