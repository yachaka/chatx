
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { storyCreateRoom } from 'actions/RoomsActions'
import { ConnectedRooms } from './Rooms'
import Input from 'components/Input'
import Button from 'components/Button'
import s from './styles.css'

export default class Home extends Component {

  create = () => {
    this.props.onCreateClick(this.refs.create.value)
  }

  render() {
    const { onRoomClick } = this.props

    return (
      <div id={s.home}>
        <h1>ChatX</h1>

        <div className={s.actions}>
          <div className={s.createInput}>
            <Input ref="create" placeholder="Create a room" />
          </div>
          <Button onClick={this.create}>
            Create
          </Button>
        </div>

        <ConnectedRooms onRoomClick={onRoomClick} />
      </div>
    )
  }
}

export const ConnectedHome = connect(
  null,
  {
    onRoomClick: (room) => push(`/${room.id}`),
    onCreateClick: storyCreateRoom,
  }
)(Home)