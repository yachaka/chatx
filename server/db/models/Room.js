
let nextId = 1
let rooms = [
  {
    id: nextId++,
    name: 'Default Room'
  }
]

class Room {
}

Room.getAll = () => Promise.resolve(rooms)
Room.getByIds = ids => Promise.resolve(rooms.filter(room => ids.indexOf(room.id) !== -1))

module.exports = Room