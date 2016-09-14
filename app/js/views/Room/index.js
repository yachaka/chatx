
import identity from 'identity-function'
import throttle from 'lodash/throttle'
import React, { PropTypes as T, Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import io from 'lib/socket.io'
import { selectRoomAndQuery, selectViewer } from 'selectors'
import { storyReply, storyUserTyping } from 'actions'
import { groupByUser } from 'lib/helpers/MessagesHelpers'
import * as schema from 'schema'
import querySchema from 'lib/querySchema'
import UsersBar from 'components/UsersBar'
import PictureBubble from 'components/PictureBubble'
import Input from 'components/Input'
import Button from 'components/Button'
import s from './styles.css'

const TYPING_DEBOUNCED = 600

/*
 * Default component
 */
export default class Room extends Component {

  state = {
    message: '',
  }

  componentWillMount() {
    io.emit('join', this.props.room.id)
  }

  componentWillUnmount() {
    io.emit('leave', this.props.room.id)
  }

  inputChange = (e) => {
    this.setState({ message: e.target.value })
  }

  keyDown = (e) => {
    if (e.keyCode === 13) {
      this.sendMessage()
      this.props.setTyping(false)
    } else {
      this.typing()
    }
  }

  typing = throttle(() => {
    this.props.setTyping(true)
  }, 600)

  sendMessage = () => {
    this.props.reply(this.state.message)
    this.setState({ message: '' })
  }

  render() {
    const { me, room, hasHistory } = this.props
    const { message } = this.state

    return (
      <div id={s.room}>
        <h2>{ room.name }</h2>

        <div id={s.users}>
          <UsersBar users={room.users} />
        </div>

        <div id={s.main}>
          { hasHistory && <p className={s.hasHistory}>
            History...
          </p> }

          <div id={s.messages}>
            { room.messages.map((group, i) => (
              <div key={i} className={s.messageGroup}>
                <div className={s.picture}>
                  <PictureBubble size={36} image={group.user.avatar} />
                </div>

                <div className={s.messages}>
                  <p className={s.username}>{group.user.username}</p>

                  { group.messages.map(msg => (<p key={msg.id} className={s.message}>{msg.body}</p>)) }
                </div>
              </div>
            )) }
                
          </div>

          { me && 
            <div id={s.reply}>
              <Input value={message} onChange={this.inputChange} onKeyDown={this.keyDown} placeholder="Write a message..." autoFocus />
              <div className={s.actions}>
                <Button onClick={this.sendMessage} disabled={message === ''}>
                  Send message
                </Button>
                <p className={s.helpText}>
                  or press Enter
                </p>
              </div>
            </div> || <p id={s.mustLogin}>
              <i className="fa fa-lock"></i> You must have an account to post messages.
            </p> }
        </div>
    {/* || <p>You must be logged in to send a message<br/><a href="/login">Login</a></p>*/}
      </div>
    )
  }
}
Room.propTypes = {
  me: T.object,
  room: T.object,
}

const CHAT_MESSAGES_LIMIT = 5

/* Connect HoC */
export const ConnectedRoom = connect(
  createSelector(
    selectRoomAndQuery('roomId'),
    selectViewer,
    (room, me) => ({
      room: room && {
        ...room,
        messages: groupByUser(room.messages.slice(CHAT_MESSAGES_LIMIT * -1)),
      } || room,
      me,
      hasHistory: room && room.messages.length > CHAT_MESSAGES_LIMIT || false,
    }),
  ),
  (dispatch, props) => ({
    reply: (body) => dispatch(storyReply(body, props.roomId)),
    setTyping: (typing) => dispatch(storyUserTyping(typing)),
  })
)((props) => props.room && <Room {...props} /> : null)
ConnectedRoom.propTypes = {
  roomId: T.string.isRequired,
}