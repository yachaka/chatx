
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import createApi from 'lib/createApi'
import reducer from './reducer'

export default (initialState) => {

  let middlewares = [
    function (dispatch, getState) {
      return thunk.withExtraArgument({
        api: createApi(getState)
      })(dispatch, getState)
    }
  ]

  return createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  )
}