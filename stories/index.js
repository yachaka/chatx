
import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Welcome from './Welcome'

import 'reset-css/reset.css'
import 'css/global.css'

import Input from 'components/Input'
import Button from 'components/Button'
import Rooms, { RoomsLoading } from 'views/Home/Rooms'
import RoomTile, { RoomTileLoading } from 'views/Home/Rooms/RoomTile'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('common.Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('common.Input', module)
  .add('default', () => (
    <Input placeholder="Placeholder" />
  ))

storiesOf('home.Rooms', module)
  .add('loading', () => {
    return <RoomsLoading />
  })
  .add('with 3 rooms', () => {
    let rooms = [
      { name: 'Room 1' },
      { name: 'Room 2' },
      { name: 'Room 3' },
    ]
    return <Rooms rooms={rooms} />
  })


storiesOf('home.RoomTile', module)
  .add('loading', () => {
    return <RoomTileLoading />
  })
  .add('default', () => {
    let room = { name: 'Room 1' }
    return <RoomTile name={room.name} />
  })
