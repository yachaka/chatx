
import React from 'react'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'

import { ConnectedRooms } from '../'
import createStore from 'createStore'
import { receivedRooms } from 'actions/RoomsActions'

describe('Rooms', () => {

  it('ConnectedRooms', () => {
    let store = createStore()

    let dom = mount(
      <ConnectedRooms />
    , {
      context: {
        store,
      }
    })

    expect(dom.instance().renderedElement.props.rooms).to.equal(null)

    let rooms = [{ id: 1, name: 'Room 1 !'}, { id: 2, name: 'Room 2 !'}, { id: 3, name: 'Room 3 !'}]
    store.dispatch(receivedRooms(rooms))

    expect(dom.instance().renderedElement.props.rooms).to.eql(rooms)
  })
})
