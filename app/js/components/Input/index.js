

import React, { Component } from 'react'

import s from './styles.css'

class Input extends Component {
  
  get value() {
    return this.refs.input.value
  }

  set value(v) {
    this.refs.input.value = v
  }

  render() {

    return (
      <input className={s.input} ref="input" {...this.props} />
    )
  }
}

export default Input
