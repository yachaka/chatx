
import React from 'react'
import cx from 'classnames'

import s from './styles.css'

export default function PictureBubble({ size = 24, image, className, ...others }) {
  
  let style = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundImage: `url(${image})`,
  }

  return (
    <div className={cx(s.bubble, className)} style={style} {...others}>
    </div>
  )
}
