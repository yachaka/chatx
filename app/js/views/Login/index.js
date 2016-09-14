
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { storyLogin } from 'actions'
import Input from 'components/Input'
import Button from 'components/Button'
import s from './styles.css'

export default class Login extends Component {
  
  state = {
    error: null,
  }

  inputs = {
    username: null,
    password: null,
  }

  clean = () => {
    if (this.state.error)
      this.setState({
        error: null,
      })
  }

  login = () => {
    this.props.login({
      username: this.inputs.username.value,
      password: this.inputs.password.value,
    })
      .catch(e => this.setState({ error: e }))
  }

  render() {
    const { error } = this.state

    return (
      <div id={s.login}>
        { error && <p className={s.error}>{error}</p> }

        <Input ref={el => this.inputs.username = el || this.inputs.username} autoFocus type="text" placeholder="username" onKeyDown={this.clean} defaultValue="SpaceX" /> 
        <Input ref={el => this.inputs.password = el || this.inputs.password} placeholder="password" onKeyDown={this.clean} defaultValue="123456" />

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
    login: storyLogin,
  }
)(Login)