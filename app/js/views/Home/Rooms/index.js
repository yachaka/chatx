
import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { createSelector } from 'reselect'

import * as schema from 'schema'
import querySchema from 'lib/querySchema'
import { selectRooms, selectEntities } from 'selectors'
import RoomTile from './RoomTile'
import s from './styles.css'

/*
 * Default Component
 */
export default function Rooms({ rooms, onRoomClick = f => f, stale }) {

  return (
    <div id={s.rooms}>
      { rooms && rooms.map(room => (
        <RoomTile
          key={room.id}
          className={s.room}
          room={room}
          onClick={() => onRoomClick(room)}
        />
      )) }
    </div>
  )
}

/* Connect HoC */
export const ConnectedRooms = connect(
  createSelector(
    selectRooms,
    selectEntities,
    (rooms, entities) => {
      if (rooms) {
        rooms = Object.keys(rooms).map(k => rooms[k])
        rooms = querySchema(rooms, entities, [schema.Room])
      }

      return {
        rooms: rooms || [],
      }
    }
  ),
  {
    onRoomClick: (room) => push(`/${room.id}`),
  }
)(Rooms)
