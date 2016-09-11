
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from 'components/Input'
import s from './styles.css'

export default class RoomReplyBox extends Component {
  
  render() {

    return (
      <Input ref="reply" placeholder="Write a message..." />
    )
  }
}

export const ConnectedRoomReplyBox = connect(
  null,
  {
    reply: 
  }
)