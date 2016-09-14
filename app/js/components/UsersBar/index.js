
import React from 'react'
import cx from 'classnames'

import AvatarBubble from 'components/AvatarBubble'
import BounceTransitionGroup from 'components/BounceTransitionGroup'
import s from './styles.css'

export default function UsersBar({ users, size = 48 }) {
  
  return (
    <div id={s.users} style={{ height: size }}>
      <BounceTransitionGroup style={{display: 'inline-block', verticalAlign: 'middle'}}>
        { users && users.map(u => (
          <AvatarBubble
            key={u.id}
            className={cx(s.user, 'animated')}
            size={size}
            image={u.avatar}
            typing={u.typing}
          />
        ))}
      </BounceTransitionGroup>
    </div>
  )
}
