
const graphql = require('graphql')

module.exports = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'An user',

  fields: () => ({
    id: { type: graphql.GraphQLID },
    username: { type: graphql.GraphQLString },
  })
})