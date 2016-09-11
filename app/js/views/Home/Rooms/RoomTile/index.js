
import React from 'react'
import cx from 'classnames'

import s from './styles.css'

export default function RoomTile({ name, userCount, messageCount, ...others }) {
  
  return (
    <div className={s.tile} {...others}>
      <h4>{name}</h4>

      <p className={s.messagesCount}>{userCount} users</p>
      <p className={s.usersCount}>{messageCount} messages</p>
    </div>
  )
}

export function RoomTileLoading() {
  return (
    <div className={cx(s.tile, s.loading)}>
      Loading tile
    </div>
  )
}