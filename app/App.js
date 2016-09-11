
import React from 'react'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from './js/createStore'

import Layout from 'views/Layout'
import Home from 'views/Home'

const store = createStore({})
const history = syncHistoryWithStore(browserHistory, store)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
          </Route>
        </Router>
      </Provider>
    )
  }
}