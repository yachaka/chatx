
const graphql = require('graphql')

const loaders = require('../../loaders')

module.exports = new graphql.GraphQLObjectType({
  name: 'Message',
  description: 'A message sent over a room',

  fields: () => ({
    id: { type: graphql.GraphQLID },
    body: { type: graphql.GraphQLString },
    user: {
      type: require('./UserType'),
      resolve: message => loaders.userById.load(message.userId)
    }
  })
})