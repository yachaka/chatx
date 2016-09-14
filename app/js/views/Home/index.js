
import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'

import { storyLogin, storyCreateRoom } from 'actions'
import { selectViewer, selectUsersArray, selectRoomsArray } from 'selectors'
import { ConnectedRooms } from './Rooms'
import UsersBar from 'components/UsersBar'
import Input from 'components/Input'
import Button from 'components/Button'
import PictureBubble from 'components/PictureBubble'
import s from './styles.css'


export default class Home extends Component {

  inputs = {
    username: null,
    password: null,
  }

  createRoom = () => {
    this.props.onCreateClick(prompt('Room name ?'))
  }

  login = () => {
    this.props.login({
      username: this.inputs.username.value,
      password: this.inputs.password.value,
    })
      .then(console.log)
      .catch(console.error)
  }

  render() {
    const { me, users, onRoomClick } = this.props

    return (
      <div id={s.home}>
        <div id={s.users}>
          <UsersBar users={users} />
        </div>

        <div className={s.rooms}>
          <ConnectedRooms />
        </div>

        { me && <div id={s.createRoom} onClick={this.createRoom}>
          <div className={s.wrap}>
            Create a room<br/>
            <i className="fa fa-plus-square-o"></i>
          </div>
        </div> }
      </div>
    )
  }
}

export const ConnectedHome = connect(
  createSelector(
    selectViewer,
    selectUsersArray,
    selectRoomsArray,
    (me, users, rooms) => ({
      me,
      users: users && users.filter(u => {
        let found = false
        rooms && rooms.forEach(r => {
          if (r.users.indexOf(u.id) !== -1)
            found = true
        })

        return !found
      })
    })
  ),
  {
    onCreateClick: storyCreateRoom,
    onRoomClick: (room) => push(`/${room.id}`),
    login: storyLogin,
  }
)(Home)