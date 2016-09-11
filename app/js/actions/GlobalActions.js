
import { createAction } from 'redux-actions'

export const RECEIVED_VIEWER_DATA = 'RECEIVED_VIEWER_DATA'
export const receivedViewerData = createAction(RECEIVED_VIEWER_DATA)
export const storyLoginAndHydrate = (credentials) => (dispatch, getState, { request }) => {
  return request
    .post('/login')
    .accept('json')
    .send(credentials)
    .then(res => {
      dispatch(receivedViewerData(res.body))
      return res.body
    })
}
export const storyRegister = (credentials) => (dispatch, getState, { makeGraphQLRequest }) => {
  return makeGraphQLRequest(`
    mutation register($username: String!, $password: String!) {
      register(username: $username, password: $password) {
        id,
        username,
      }
    }
  `, credentials)
}