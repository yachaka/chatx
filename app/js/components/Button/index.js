
import React, { PropTypes as T } from 'react'
import cx from 'classnames'

import s from './styles.css'

export default function Button({ type, children, ...others }) {
  
  return (
    <button className={cx(s.button, s[type])} {...others}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: T.oneOf([
    'primary'
  ])
}

Button.defaultProps = {
  type: 'primary'
}