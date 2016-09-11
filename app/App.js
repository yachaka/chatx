
import React from 'react'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from './js/createStore'

import { selectViewer } from 'selectors'
import Layout from 'views/Layout'
import { ConnectedHome } from 'views/Home'
import { ConnectedRoom } from 'views/Room'
import { ConnectedRegister } from 'views/Register'
import { ConnectedLogin } from 'views/Login'

const store = createStore({}, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

const RoomRoute = ({ params }) => <ConnectedRoom roomId={parseInt(params.roomId)} />

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