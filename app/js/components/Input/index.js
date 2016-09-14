
import React, { Component } from 'react'
import cx from 'classnames'

import s from './styles.css'

class Input extends Component {
  
  get value() {
    return this.refs.input.value
  }

  set value(v) {
    this.refs.input.value = v
  }

  render() {
    const { className, ...others } = this.props

    return (
      <input className={cx(s.input, className)} ref="input" {...others} />
    )
  }
}

export default Input
