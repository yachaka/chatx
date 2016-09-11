
import React, { Component } from 'react'

import { ConnectedRooms } from './Rooms'
import s from './styles.css'

class Home extends Component {

  render() {

    return (
      <div id={s.home}>
        <h1>ChatX</h1>
        <ConnectedRooms />
      </div>
    )
  }
}

export default Home
