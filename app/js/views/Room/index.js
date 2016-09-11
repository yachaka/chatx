
import identity from 'identity-function'
import React, { PropTypes as T, Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { withPledge, createPledge } from 'lib/pledge'
import { storyHydrateRoomById, storySendMessageAndHydrateRoom } from 'actions/RoomsActions'
import { selectRooms } from 'selectors'
import Input from 'components/Input'
import Button from 'components/Button'
import s from './styles.css'

/*
 * Default component
 */
export default class Room extends Component {
  
  sendMessage = () => {
    this.props.sendMessage(this.refs.message.value)
    this.refs.message.value = ''
  }

  render() {
    const { me, room } = this.props

    return (
      <div id={s.room}>
        <h1>{ room.name }</h1>

        <div id={s.main}>
          <div id={s.users}>
            { room.users.map(user => <p key={user.id} className={s.user}>{user.username}</p>) }
          </div>

          <div id={s.messages}>
            { room.messages.map(msg => <p key={msg.id} className={s.message}><strong>{msg.user.username}:</strong> {msg.body}</p>) }
          </div>
        </div>

        <Input ref="message" placeholder="Write a message..."/>
        <Button onClick={this.sendMessage}>
          Send message
        </Button>
      </div>
    )
  }
}
Room.propTypes = {
  me: T.object,
  room: T.object.isRequired,
}

/* Pledge HoC */
export const PledgedRoom = withPledge(
  createPledge(
    props => props.room && props.room.messages && props.room.users && props.room.id,
    props => props.hydrateRoom(),
  ),
  true,
)(Room)
PledgedRoom.propTypes = {
  hydrateRoom: T.func.isRequired,
}

/* Connect HoC */
export const ConnectedRoom = connect(
  createSelector(
    selectRooms,
    (_, props) => props.roomId,
    (rooms, roomId) => ({
      room: rooms && rooms[roomId]
    }),
  ),
  (dispatch, props) => ({
    hydrateRoom: () => dispatch(storyHydrateRoomById(props.roomId)),
    sendMessage: (body) => dispatch(storySendMessageAndHydrateRoom(props.roomId, body))
  })
)(PledgedRoom)
ConnectedRoom.propTypes = {
  roomId: T.number.isRequired,
}