
import request from 'lib/request'

export const makeGraphQLRequest = (query, variables) => (
  request
    .post('/graphql')
    .set({ 'Content-Type': 'application/json' })
    .send({
      query,
      variables,
    })
    .then(res => res.body.data)
)