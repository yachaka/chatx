
import { expect } from 'chai'

import RoomsReducer from '../RoomsReducer'
import { receivedRooms, deletedRooms } from 'actions/RoomsActions'

describe('RoomsReducer', () => {


  it('should be initialized at null', () => {
    let state = RoomsReducer(undefined, { type: 'DUMMY '})
    expect(state).to.equal(null)
  })

  it('should correctly add rooms', () => {
    let rooms = [{ id: 1, name: 'Ok1' }, { id: 3, name: 'Ok1' }]
    let state = RoomsReducer(undefined, receivedRooms(rooms))
    expect(state).to.eql({
      1: rooms[0],
      3: rooms[1]
    })
  })
})
