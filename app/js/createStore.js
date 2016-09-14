
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import io from 'lib/socket.io'
import reducer from './reducer'

export default (initialState, history) => {

  let middlewares = [
    function (dispatch, getState) {
      return thunk.withExtraArgument({
        io,
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