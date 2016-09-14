
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { storyLogout } from 'actions'
import PictureBubble from 'components/PictureBubble'
import Button from 'components/Button'
import Link from 'components/Link'
import 'reset-css/reset.css'
import 'css/global.css'
import s from './styles.css'

import { selectViewer } from 'selectors'

const Anonymous = ({ onLogin, onRegister }) => (
  <div id={s.userInfos}>
    <Button Component={Link} to="/login">
      <i className="fa fa-sign-in"></i> Login
    </Button>

    <Button Component={Link} to="/register">
      Register
    </Button>
  </div>
)

const UserInfos = ({ me, onLogout }) => (
  <div id={s.userInfos}>
    <div className={s.picture}>
      <PictureBubble size={36} image={me.avatar} />
    </div>

    <p className={s.username}>
      {me.username}
    </p>

    <Button className={s.logout} onClick={onLogout}>
      <i className="fa fa-toggle-off"></i> Logout
    </Button>
  </div>
)

@connect(
  createSelector(
    selectViewer,
    viewer => ({ me: viewer })
  ),
  {
    logout: storyLogout,
  }
)
export default class Layout extends Component {

  render() {
    const { me, children } = this.props

    return (
      <div id={s.layout}>
        <h1><Link to="/">ChatX</Link></h1>

        { me && <UserInfos me={me} onLogout={this.props.logout} /> || <Anonymous /> }

        {children}
      </div>
    )
  }
}
