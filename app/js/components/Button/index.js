
import React, { PropTypes as T } from 'react'
import cx from 'classnames'

import s from './styles.css'

export default function Button({ type = 'primary', Component = 'button', className, disabled = false, children, ...others }) {
  
  return (
    <Component className={cx(s.button, s[type], { [s.disabled]: disabled }, className)} {...others}>
      {children}
    </Component>
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