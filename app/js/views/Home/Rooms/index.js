
import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { withPledge, createPledge } from 'lib/pledge'
import { selectRooms } from 'selectors'
import { storyHydrateAllRooms } from 'actions/RoomsActions'
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
          name={room.name}
          messageCount={room.messages.length}
          userCount={room.users.length}
          onClick={() => onRoomClick(room)} />
      )) }
    </div>
  )
}

/* Loading View */
export const RoomsLoading = () => (
  <div id={s.rooms}>
    I'm loading !
  </div>
)

/* Pledge HoC @see lib/pledge */
export const PledgedRooms = withPledge(
  createPledge(
    (props) => props.rooms && props.rooms[0].messages,
    (props) => props.hydrateRooms(),
  ),
  true
)(Rooms, RoomsLoading)
PledgedRooms.propTypes = {
  hydrateRooms: T.func.isRequired,
}

/* Connect HoC */
export const ConnectedRooms = connect(
  createSelector(
    selectRooms,
    rooms => ({
      rooms: rooms && Object.keys(rooms).map(k => rooms[k]) || rooms
    })
  ),
  {
    hydrateRooms: storyHydrateAllRooms,
  }
)(PledgedRooms)
