
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { storyRegister } from 'actions/GlobalActions'
import Input from 'components/Input'
import Button from 'components/Button'
import s from './styles.css'

export default class Register extends Component {

  register = () => {
    this.props.register({
      username: this.refs.username.value,
      password: this.refs.password.value,
    })
      .then((data) => alert(`
        User created:
        ${JSON.stringify(data)}
      `))
  }

  render() {

    return (
      <div>
        <h1>Register to ChatX</h1>

        <Input ref="username" type="text" placeholder="username" autoFocus /> 
        <Input ref="password" type="password" placeholder="password" />

        <Button onClick={this.register}>
          Register
        </Button>
      </div>
    )
  }
}

export const ConnectedRegister = connect(
  null,
  {
    register: storyRegister
  }
)(Register)