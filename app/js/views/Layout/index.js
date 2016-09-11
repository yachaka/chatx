
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import 'reset-css/reset.css'
import 'css/global.css'
import s from './styles.css'

import { selectViewer } from 'selectors'
import { receivedViewerData } from 'actions/GlobalActions'

@connect(
  createSelector(
    selectViewer,
    viewer => ({ me: viewer })
  )
)
export default class Layout extends Component {

  componentWillMount() {
    this.props.dispatch((dispatch, getState, { request }) => {
      request
        .get('/me')
        .accept('json')
        .then(res => {
          dispatch(receivedViewerData(res.body))
        })
        .catch(console.log)
    })
  }

  render() {
    const { me, children } = this.props
    return (
      <div id={s.layout}>
        <p className={s.loggedAs}>Logged as: {JSON.stringify(me)}</p>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
        {children}
      </div>
    )
  }
}
