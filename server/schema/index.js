
const graphql = require('graphql')

const Query = require('./types/QueryType')

module.exports = new graphql.GraphQLSchema({
  query: Query
})