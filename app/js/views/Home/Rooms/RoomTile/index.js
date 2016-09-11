
import React from 'react'
import cx from 'classnames'

import s from './styles.css'

export default function RoomTile({ name }) {
  
  return (
    <div className={s.tile}>
      <h4>{name}</h4>
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