
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { storyLoginAndHydrate } from 'actions/GlobalActions'
import Input from 'components/Input'
import Button from 'components/Button'
import s from './styles.css'

export default class Login extends Component {
  
  state = {
    unauthorized: false,
  }

  clean = () => {
    if (this.state.unauthorized)
      this.setState({
        unauthorized: false,
      })
  }

  login = () => {
    this.props.login({
      username: this.refs.username.value,
      password: this.refs.password.value
    })
      .catch(e => this.setState({ unauthorized: true }))
  }

  render() {
    const { unauthorized } = this.state

    return (
      <div id={s.login}>
        <h1>Login</h1>

        { unauthorized && <p id={s.authError}>Invalid credentials</p> }
        <Input ref="username" autoFocus type="text" placeholder="username" onKeyDown={this.clean} defaultValue="John Doe" /> 
        <Input ref="password" type="password" placeholder="password" onKeyDown={this.clean} defaultValue="123456" />

        <Button onClick={this.login}>
          Login
        </Button>
      </div>
    )
  }
}

export const ConnectedLogin = connect(
  null,
  {
    login: storyLoginAndHydrate,
  }
)(Login)