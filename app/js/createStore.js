
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import { makeGraphQLRequest } from 'lib/makeGraphQLRequest'
import request from 'lib/request'
import reducer from './reducer'

export default (initialState, history) => {

  let middlewares = [
    function (dispatch, getState) {
      return thunk.withExtraArgument({
        makeGraphQLRequest,
        request,
      })(dispatch, getState)
    },
    routerMiddleware(history)
  ]

  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension && window.devToolsExtension() || function(f) { return f }
    )
  )
}