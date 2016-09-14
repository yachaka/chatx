
import React from 'react'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import io from 'lib/socket.io'

import createStore from './js/createStore'

import { updateViewer, updateRooms, updateUsers, updateMessages } from 'actions'
import { selectViewer } from 'selectors'
import Layout from 'views/Layout'
import { ConnectedHome } from 'views/Home'
import { ConnectedRoom } from 'views/Room'
import { ConnectedRegister } from 'views/Register'
import { ConnectedLogin } from 'views/Login'

import { normalize } from 'normalizr'
import * as schema from './js/schema'

const store = createStore({}, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

/*************/
/* Socket.io */
/*
 * Here we batch initialState because we do not want to render partial data ;
 * We need complete initial data
 */
function batchOrDispatch(fn) {
  let batching = false
  let batched = []

  return (data) => {
    if (data.state && data.state === 'initializing') {
      batching = true
    } else if (data.state && data.state === 'ready') {
      batching = false
      
      if (batched.length > 0)
        fn(batched)

    } else if (batching === true) {
      batched.push(data)
    } else {
      fn([data])
    }
  }
}

io.on('updateViewer', viewer => {
  store.dispatch(updateViewer(viewer))
})
io.on('updateRoom', batchOrDispatch(changes => store.dispatch(updateRooms(changes))))
io.on('updateUser', batchOrDispatch(changes => store.dispatch(updateUsers(changes))))
io.on('updateMessage', batchOrDispatch(changes => store.dispatch(updateMessages(changes))))

/**********/
/* Routes */

const RoomRoute = ({ params }) => <ConnectedRoom roomId={params.roomId} />

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Layout}>
            <IndexRoute component={ConnectedHome} />
            <Route path="register" component={ConnectedRegister} />
            <Route path="login" component={ConnectedLogin} />
            <Route path=":roomId" component={RoomRoute} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
            // <Route onEnter={(_, replace) => {
            //     if (selectViewer(store.getState()) === null) {
            //       console.log('e', _)
            //       replace('/login')
            //     }
            //   }}
            // >
            // </Route>