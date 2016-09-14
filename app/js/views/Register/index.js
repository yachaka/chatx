
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { storyRegister } from 'actions'
import Input from 'components/Input'
import Button from 'components/Button'
import s from './styles.css'

export default class Register extends Component {

  inputs = {
    avatar: null,
    username: null,
    password: null,
  }

  state = {
    error: null,
  }

  register = () => {
    this.props.register({
      avatar: this.inputs.avatar.value,
      username: this.inputs.username.value,
      password: this.inputs.password.value,
    })
      .catch(error => this.setState({ error }))
  }

  clean = () => {
    if (this.state.error)
      this.setState({ error: null })
  }
  
  render() {
    const { error } = this.state

    return (
      <div id={s.register}>
        <h3>Register to ChatX</h3>

        {error && <p className={s.error}>{error}</p> }
        <Input ref={el => this.inputs.avatar = el || this.inputs.avatar} type="text" placeholder="URL of avatar" autoFocus onChange={this.clean} /> 
        <Input ref={el => this.inputs.username = el || this.inputs.username} type="text" placeholder="Username" onChange={this.clean} /> 
        <Input ref={el => this.inputs.password = el || this.inputs.password} type="password" placeholder="Password" onChange={this.clean} />

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
    register: storyRegister,
  }
)(Register)