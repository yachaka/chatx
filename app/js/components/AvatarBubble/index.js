
import React from 'react'
import cx from 'classnames'

import PictureBubble from 'components/PictureBubble'
import s from './styles.css'

export default function AvatarBubble({ size, image, typing, className }) {
  
  return (
    <div className={cx(s.user, className)}>
      <PictureBubble size={size} image={image} />
      {typing && <div className={s.typing}><i className="fa fa-commenting-o"></i></div>}
    </div>
  )
}
