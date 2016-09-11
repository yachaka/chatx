
const graphql = require('graphql')

const Room = require('../../db/models/Room')

module.exports = new graphql.GraphQLObjectType({
  name: 'Query',
  description: 'Root query',

  fields: () => ({

    rooms: {
      type: new graphql.GraphQLList(require('./RoomType')),
      resolve: () => Room.getAll()
    }
  })
})