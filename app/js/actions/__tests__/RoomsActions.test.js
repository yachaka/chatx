
import { expect } from 'chai'
import { spy, stub } from 'sinon'
import identity from 'identity-function'

import { RECEIVED_ROOMS, receivedRooms, storyHydrateAllRooms, storyHydrateRoomById } from '../RoomsActions'

describe('RoomsActions', () => {

  /*
  * This test isn't up to date, had no time
  ******
  it('should fetch all rooms and hydrate the store', (done) => {
    let dispatchSpy = spy()
    let getStateStub = spy()

    let rooms = [{ title: 'Test Room 1' }, { title: 'Test Room 2' }]
    let getStub = stub().returns(Promise.resolve(rooms))
    let apiMock = {
      rooms: { getAll: getAllStub }
    }

    let promise = storyHydrateAllRooms()(dispatchSpy, getStateStub, { api: apiMock })
    expect(getAllStub.calledOnce).to.be.true
    expect(promise).to.be.an.instanceof(Promise)
    promise.then((returned) => {
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.firstCall.args[0]).to.eql(receivedRooms(rooms))
      expect(returned).to.eql(rooms)
      done()
    })
  })

  it('should fetch one room by ID and hydrate that room', (done) => {
    let dispatchSpy = spy()
    let getStateStub = spy()
    expect(trueApi && trueApi.rooms && trueApi.rooms.getById).to.be.ok

    let room = { id: 3, title: 'Test Room 1' }
    let getByIdStub = stub().returns(Promise.resolve(room))
    let apiMock = {
      rooms: { getById: getByIdStub }
    }

    let promise = storyHydrateRoomById(room.id)(dispatchSpy, getStateStub, { api: apiMock })
    expect(getByIdStub.calledOnce).to.be.true
    expect(getByIdStub.firstCall.args[0]).to.equal(room.id)
    expect(promise).to.be.an.instanceof(Promise)
    promise.then((returned) => {
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.firstCall.args[0]).to.eql(receivedRooms([room]))
      expect(returned).to.eql(room)
      done()
    })
  })*/
})
