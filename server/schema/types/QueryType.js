
const graphql = require('graphql')

const Room = require('../../db/models/Room')
const loaders = require('../../loaders')

module.exports = new graphql.GraphQLObjectType({
  name: 'Query',
  description: 'Root query',

  fields: () => ({

    room: {
      type: require('./RoomType'),
      args: {
        id: { type: graphql.GraphQLID }
      },
      resolve: (_, { id }, req) => {
        return loaders.roomById.load(id)
      }
    },

    rooms: {
      type: new graphql.GraphQLList(require('./RoomType')),
      resolve: () => Room.getAll()
    }
  })
})