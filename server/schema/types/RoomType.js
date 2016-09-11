
const graphql = require('graphql')

const loaders  = require('../../loaders')

module.exports = new graphql.GraphQLObjectType({
  name: 'Room',
  description: 'A chat room',

  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },

    users: {
      type: new graphql.GraphQLList(require('./UserType')),
      resolve: (room) => loaders.userById.loadMany(room.users)
    },

    messages: {
      type: new graphql.GraphQLList(require('./MessageType')),
      resolve: room => loaders.messageById.loadMany(room.messages)
    }
  })
})