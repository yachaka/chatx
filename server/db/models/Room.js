
const Model = require('./Model')

const Room = new Model()

Room.create({
    name: 'Default Room',
    users: [1],
    messages: [1],
})

module.exports = Room
