
const graphql = require('graphql')

const Query = require('./types/QueryType')
const Mutation = require('./types/MutationType')

module.exports = new graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation,
})